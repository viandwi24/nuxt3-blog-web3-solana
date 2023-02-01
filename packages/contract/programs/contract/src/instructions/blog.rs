use {
    anchor_lang::{
        prelude::*,
    },
    crate::{
        constant::{
            PROGRAM_SEED,
            PROGRAM_SEED_PREFIX_BLOG,
        },
        state::{
            BlogAccount,
        },
    },
};

pub fn init_blog(ctx: Context<InitBlogContext>, name: String) -> Result<()> {
    let blog_account = &mut ctx.accounts.blog_account;
    blog_account.name = name;
    blog_account.authority = ctx.accounts.user.key();
    blog_account.last_post_id = 0;

    msg!("Create blog account");
    msg!("Wallet address: {}", ctx.accounts.user.key());
    msg!("Name: {}", blog_account.name);
    msg!("Last post id: {}", blog_account.last_post_id);
    msg!("Authority: {}", blog_account.authority.key());

    Ok(())
}

#[derive(Accounts)]
pub struct InitBlogContext<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + (4 + 30) + 32 + 8,
        seeds = [
            PROGRAM_SEED.as_bytes(),
            PROGRAM_SEED_PREFIX_BLOG.as_bytes(),
            user.key().as_ref(),
        ],
        bump,
    )]
    pub blog_account: Account<'info, BlogAccount>,
    /// CHECK: We're about to create this with Anchor
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
