import { authenticate } from "@feathersjs/express";
import type { HookContext } from "../../declarations";

export default {
    before: {
        all: [],
        find : async (context : HookContext) =>{
            if(context.params.user.role ! == 'admin'){
                context.params.query = {userId :context.params.user?._id}
        }
        return context
    },
    get : async (context : HookContext) =>{
        if (context.params.user.role ! == "admin" && context.params.user._id ! == context.id) {
            throw new Error('You can only access your own orders')
        }
        return context
    },
    create : async (context : HookContext) =>{
        // Set the userId to the authenticated user's ID
        context.data.userId = context.params.user._id
        return context
    },
    patch : async (context : HookContext) =>{
        if (context.params.user.role ! == "admin" && context.params.user._id ! == context.id) {
            throw new Error('You can only modify your own orders')
        }
        return context
    },
    remove : async (context : HookContext) =>{
        if (context.params.user.role ! == "admin" && context.params.user._id ! == context.id) { 
            throw new Error('You can only delete your own orders')
        }
        return context
    },
    after: {},
    error: {}
}
}