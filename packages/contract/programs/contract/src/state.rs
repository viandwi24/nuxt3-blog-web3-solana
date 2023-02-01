use {
    anchor_lang::prelude::*
};

#[account]
pub struct BlogAccount {
    pub name: String, // 4 + 30
    pub authority: Pubkey, // 32
    pub last_post_id: u64, // 8
}

#[account]
pub struct UserAccount {
    pub name: String, // 4 + 30
    pub email: String, // 4 + 40
    pub image: String, // 4 + 256
    pub authority: Pubkey, // 32
}

#[account]
pub struct PostAccount {
    pub id: u64, // 8
    pub title: String, // 4 + 30
    pub content: String, // 4 + 2048
    pub user: Pubkey, // 32
}
