use {
    anchor_lang::{
        prelude::*,
    },
    crate::{
        constant::{
            PROGRAM_SEED,
            PROGRAM_SEED_PREFIX_USER,
        },
        state::{
            BlogAccount,
            UserAccount,
        },
    },
};

pub fn create_user(
    ctx: Context<CreateUserContext>,
    name: String,
    email: String,
    image: String,
) -> Result<()> {

    let user_account = &mut ctx.accounts.user_account;
    user_account.name = name;
    user_account.email = email;
    user_account.image = image;
    user_account.authority = ctx.accounts.user.key();

    msg!("Create user account");
    msg!("Wallet address: {}", ctx.accounts.user.key());
    msg!("Name: {}", user_account.name);
    msg!("Email: {}", user_account.email);
    msg!("Image: {}", user_account.image);
    msg!("Authority: {}", user_account.authority.key());

    Ok(())
}

#[derive(Accounts)]
#[instruction(name: String, email: String, image: String)]
pub struct CreateUserContext<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + (4 + 30) + (4 + 40) + (4 + 256) + 32,
        seeds = [
            PROGRAM_SEED.as_bytes(),
            PROGRAM_SEED_PREFIX_USER.as_bytes(),
            blog_account.key().as_ref(),
            user.key().as_ref(),
        ],
        bump,
    )]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub blog_account: Account<'info, BlogAccount>,
    /// CHECK: We're about to create this with Anchor
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
