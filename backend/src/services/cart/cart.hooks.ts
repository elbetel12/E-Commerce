import {authenticate} from '@feathersjs/authentication'
import type {HookContext} from '../../declarations'

export default {
    before : {
        all : [authenticate('jwt')],
        find : async(context : HookContext) => {
            // Users can only see their own cart
            context.params.query = {userId : context.params.user?._id}
            return context
        },
        get : async(context : HookContext) =>{
            if (context.params.user?._id ! == context.id) {
                throw new Error('You can only access your own cart')
            }
            return context
        },
        create : async(context : HookContext) => {
            // Set the userId to the authenticated user's ID
            context.data.userId = context.params.user._id
            return context
        },
        patch : async(context : HookContext) =>{
            if (context.params.user?._id ! == context.id) {
                throw new Error('You can only modify your own cart')
            }
            return context
        },
        remove : async(context : HookContext) =>{
            if (context.params.user?._id ! == context.id) {
                throw new Error('You can only delete your own cart')
            }
            return context
        }
    },
    after : {},
    error : {}
    }