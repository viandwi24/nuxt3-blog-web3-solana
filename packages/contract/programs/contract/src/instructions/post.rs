use {
    anchor_lang::{
        prelude::*,
    },
    crate::{
        constant::{
            PROGRAM_SEED,
            PROGRAM_SEED_PREFIX_POST,
        },
        state::{
            BlogAccount,
            UserAccount,
            PostAccount,
        },
    },
};

pub fn create_post(
    ctx: Context<CreatePostContext>,
    title: String,
    content: String,
    id: String,
) -> Result<()> {

    let blog_account = &mut ctx.accounts.blog_account;
    let user_account = &mut ctx.accounts.user_account;
    let post_account = &mut ctx.accounts.post_account;
    let user = &mut ctx.accounts.user;

    // convert id to number u64
    let id_num = id.parse::<u64>().unwrap();

    // user_account.authority must be the same as current user
    if user_account.authority != user.key() {
        return Err(CreatePostError::Unauthorized.into());
    }

    // id must be the same as blog_account.last_post_id
    if id_num != blog_account.last_post_id {
        return Err(CreatePostError::InvalidPostId.into());
    }

    post_account.id = blog_account.last_post_id;
    post_account.title = title;
    post_account.content = content;
    post_account.user = user_account.key();

    blog_account.last_post_id += 1;

    Ok(())
}

#[derive(Accounts)]
#[instruction(title: String, content: String, id: String)]
pub struct CreatePostContext<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8 + (4 + 30) + (4 + 2048) + 32,
        seeds = [
            PROGRAM_SEED.as_bytes(),
            PROGRAM_SEED_PREFIX_POST.as_bytes(),
            blog_account.key().as_ref(),
            user_account.key().as_ref(),
            id.as_ref(),
        ],
        bump,
    )]
    pub post_account: Account<'info, PostAccount>,
    /// CHECK: We're about to create this with Anchor
    #[account(mut)]
    pub blog_account: Account<'info, BlogAccount>,
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum CreatePostError {
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Invalid post id")]
    InvalidPostId,
}
