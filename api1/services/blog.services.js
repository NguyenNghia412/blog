const Blog = require("../models/blog.model")

/**
 * Đăng bài
 * @param {*} param0 
 * @param {*} param1 
 * @returns 
 */
const createBlog = async ({ title, content, summary, category, thumbnail, tags }, { userId, username, displayName }) => {
    const blog = await Blog.create({
        title,
        content,
        summary,
        thumbnail,
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

module.exports = {
    createBlog,
    updateBlog,
    getPagingBlog,
    getBlog,
    deleteBlog,
}