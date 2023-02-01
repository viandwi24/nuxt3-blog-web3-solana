use {
    anchor_lang::prelude::*,
    instructions::*,
    instructions::{
        CreateUserContext,
    },
};

pub mod instructions;
pub mod constant;
pub mod state;

declare_id!("D8kSsEmQm9ob4erUySzusYJWFh79snxQN3CcmuNaiS16");

#[program]
pub mod contract {
    use super::*;

    pub fn init_blog(ctx: Context<InitBlogContext>, name: String) -> Result<()> {
        return instructions::init_blog(ctx, name);
    }

    pub fn create_user(
        ctx: Context<CreateUserContext>,
        name: String,
        email: String,
        image: String,
    ) -> Result<()> {
        return instructions::create_user(
            ctx,
            name,
            email,
            image,
        )
    }

    pub fn create_post(
        ctx: Context<CreatePostContext>,
        title: String,
        content: String,
        id: String,
    ) -> Result<()> {
        return instructions::create_post(
            ctx,
            title,
            content,
            id,
        )
    }
}

