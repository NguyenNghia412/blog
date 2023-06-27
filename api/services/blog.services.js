const { default: slugify } = require("slugify");
const Blog = require("../models/blog.model")

/**
 * Đăng bài
 * @param {*} param0 
 * @param {*} param1 
 * @returns 
 */
const createBlog = async ({ title, content, summary, category, thumbnail, tags }, { userId, username, displayName }) => {
    
    const slug = await genSlug(title);

    const blog = await Blog.create({
        title,
        content,
        summary,
        thumbnail,
        slug,
        tags,
        category,
        author: {
            authorId: userId,
            username,
            displayName
        },
    });

    return blog;
}

/**
 * PHÂN TRANG BLOG
 * @param {*} param0 
 * @returns 
 */
const getPagingBlog = async ({pageNumber, pageSize, keyword}) => {
    const limit = pageSize * 1;
    const skip = (pageNumber - 1) * limit * 1;

    const [{ data, count }] = await Blog.aggregate([
        {
            $match: {
                $and: [
                    {deleted: false}
                ]
            },
        },
        {
            $sort: {
                createdDate: -1
            }
        },
        {
            $facet: {
                data: [
                    { $skip: skip },
                    { $limit: limit }
                ],
                count: [
                    { $count: 'totalItems' },
                ]
            }
        }
    ]).exec();

    return {
        data,
        totalItems: count[0].totalItems
    };
}

/**
 * GET 1 BLOG
 * @param {*} param0 
 * @returns 
 */
const getBlog = async ({ blogId }) => {
    const data = await Blog.findById(blogId).findOne({ deleted: false }).exec();
    return data.toObject();
}

/**
 * GET 1 BLOG BY SLUG
 * @param {*} param0 
 * @returns 
 */
const getBlogBySlug = async ({ slug }) => {
    const data = await Blog.findOne({ slug, deleted: false }).exec();
    return data.toObject();
}

/**
 * CẬP NHẬT BLOG
 * @param {*} param0 
 * @returns 
 */
const updateBlog = async({ id, title, content, summary, category, thumbnail, tags }) => {
    const blog = await Blog.findById(id).find({ deleted: false }).updateOne({
        title,
        content,
        summary,
        thumbnail,
        tags,
        category,
    }).exec();

    return blog;
}

/**
 * XOÁ MỀM BLOG
 * @param {*} param0 
 * @returns 
 */
const deleteBlog = async({ id }) => {
    const blog = await Blog.findOne({ id, deleted: false }).updateOne({
        deleted: true
    }).exec();

    return blog;
}

/**
 * SINH SLUG
 * @param {*} slug 
 * @returns 
 */
const genSlug = async (title = '') => {
    const slug = slugify(title, {
        locale: 'vi',      // language code of the locale to use
        trim: true,
        lower: true,        // trim leading and trailing replacement chars, defaults to `true`
    });
    let finalSlug = slug;
    let blogBySlug = await Blog.findOne({ slug }).exec();

    while (blogBySlug !== null) {
        let arr = blogBySlug.slug.split('_');
        let num = arr.pop() * 1;

        if (num) {
            finalSlug = `${slug}_${++num}`;    
        } else {
            finalSlug = `${slug}_1`;    
        }
        
        blogBySlug = await Blog.findOne({ slug: finalSlug }).exec();
    }

    return finalSlug;
}

module.exports = {
    createBlog,
    updateBlog,
    getPagingBlog,
    getBlog,
    getBlogBySlug,
    deleteBlog,
}