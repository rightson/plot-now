'use strict';

import mongoose from 'mongoose'

import { getValidId } from '../../lib/validation'
import libqs from '../../lib/querystring'

const User = mongoose.model('User');

export default { list, create, read, update, remove }

export async function list(ctx) {
    let qs = libqs.getQueryString(ctx);
    let { skip, limit } = libqs.getPagination(qs)
    let sort = libqs.getSortingOption(qs);
    ctx.body = await User.find(qs).sort(sort).skip(skip).limit(limit)
}

export async function create(ctx) {
    let body = ctx.request.body;
    try {
        ctx.body = await User.create(body)
        ctx.status = 201
    } catch(error) {
        ctx.throw(400, error)
    }
}

export async function read(ctx) {
    let doc = ctx.body = await User.findById(getValidId(ctx))
    if (!doc) ctx.throw(404)
}

export async function update(ctx) {
    let doc = ctx.body = await User.findOneAndUpdate(
        { _id: getValidId(ctx) },
        ctx.request.body,
        { new: true })
    if (!doc) ctx.throw(404)
}

export async function remove(ctx) {
    let doc = ctx.body = await User.findByIdAndRemove(getValidId(ctx))
    if (!doc) ctx.throw(404)
}
