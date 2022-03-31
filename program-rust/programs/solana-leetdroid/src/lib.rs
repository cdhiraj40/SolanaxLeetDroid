use anchor_lang::prelude::*;
use serde::{Serialize, Deserialize};

declare_id!("E3s8VLFoVor6k7oXC6yrsCpgvJoky26zPceeF8eGBPtD");

#[program]
pub mod solana_leetdroid {
    use super::*;

    // problem solved -> easy, medium, hard --> just do string lel
    pub fn send_profile(
        ctx: Context<SendProfile>,
        username: String,
        name: String,
        bio: String,
        ranking: String,
        problem_solved: i32,
        acceptance_rate: f32,
        stars: i8,
    ) -> Result<()> {
        let profile: &mut Account<LeetCodeAccount> = &mut ctx.accounts.profile;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if username.chars().count() > 50 {
            return Err(ErrorCode::UsernameTooLong.into());
        }
        if name.chars().count() > 50 {
            return Err(ErrorCode::NameTooLong.into());
        }
        if bio.chars().count() > 200 {
            return Err(ErrorCode::BioTooLong.into());
        }
        if ranking.chars().count() > 10 {
            return Err(ErrorCode::RankingTooLong.into());
        }
        if problem_solved.to_string().len() > 4 {
            return Err(ErrorCode::ProblemSolvedTooLarge.into());
        }
        if (acceptance_rate * 100.0).round() / 100.00 > 100.00 {
            return Err(ErrorCode::AcceptanceRateTooGood.into());
        }
        if stars > 5 {
            return Err(ErrorCode::TooManyStars.into());
        }
        
        let account = LeetcodeAccount {
            timestamp:clock.unix_timestamp,
            username: username.to_string(),
            name: name.to_string(),
            bio: bio.to_string(),
            ranking: ranking.to_string(),
            problem_solved:problem_solved,
            acceptance_rate:acceptance_rate,
            stars
        };
        let serialized_account = serde_json::to_string(&account).unwrap();

        msg!("{}",serialized_account);
        profile.owner = *author.key;
        profile.timestamp = clock.unix_timestamp;
        profile.username = username;
        profile.name = name;
        profile.bio = bio;
        profile.ranking = ranking;
        profile.problem_solved = problem_solved;
        profile.acceptance_rate = acceptance_rate;
        profile.stars = stars;

        Ok(())
    }

    pub fn initialize(ctx: Context<Initialize>, bio: String) -> Result<()> {
        let profile: &mut Account<LeetCodeAccount> = &mut ctx.accounts.profile;
        profile.bio = bio;

        Ok(())
    }
}

// for logs
#[derive(Serialize, Deserialize, Debug)]
struct LeetcodeAccount {
    pub timestamp: i64,
    pub username: String,
    pub name: String,
    pub bio: String,
    pub ranking: String,
    pub problem_solved: i32,
    pub acceptance_rate: f32,
    // max 100.00
    pub stars: i8
}

#[derive(Accounts)]
pub struct Initialize<'info>{
    #[account(init, payer = author, space = 8+1000)]
    pub profile: Account<'info, LeetCodeAccount>,
    #[account(mut)] // we are going to mutate the amount of money in their account.
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct SendProfile<'info> {
    #[account(init, payer = author, space = LeetCodeAccount::LEN)]
    pub profile: Account<'info, LeetCodeAccount>,
    #[account(mut)] // we are going to mutate the amount of money in their account.
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Defined the structure of the LeetCode Account.
#[account]
pub struct LeetCodeAccount {
    pub owner: Pubkey,
    pub timestamp: i64,
    pub username: String,
    pub name: String,
    pub bio: String,
    pub ranking: String,
    pub problem_solved: i32,
    pub acceptance_rate: f32,
    // max 100.00
    pub stars: i8,
}

// Adding some useful constants for sizing properties.
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;
// Stores the size of the string.
// 50 chars max
const NAME_LENGTH: usize = 50 * 4;
// 50 chars max
const USERNAME_LENGTH: usize = 50 * 4;
// 200 chars max
const BIO_LENGTH: usize = 200 * 4;
// 10 chars max
const RANKING_LENGTH: usize = 10 * 4;
// max around ~2500
const PROBLEM_SOLVED_LENGTH: usize = 4;
const ACCEPTANCE_RATE_LENGTH: usize = 4;
// max 5
const STARS_LENGTH: usize = 1;
const TIMESTAMP_LENGTH: usize = 8;

impl LeetCodeAccount {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH
        + TIMESTAMP_LENGTH
        + STRING_LENGTH_PREFIX
        + USERNAME_LENGTH
        + STRING_LENGTH_PREFIX
        + NAME_LENGTH
        + STRING_LENGTH_PREFIX
        + BIO_LENGTH
        + STRING_LENGTH_PREFIX
        + RANKING_LENGTH
        + PROBLEM_SOLVED_LENGTH
        + ACCEPTANCE_RATE_LENGTH
        + STARS_LENGTH;
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided username should be 50 characters long maximum.")]
    UsernameTooLong,
    #[msg("The provided name should be 50 characters long maximum.")]
    NameTooLong,
    #[msg("The provided bio should be 200 characters long maximum.")]
    BioTooLong,
    #[msg("The provided ranking should be 10 characters long maximum.")]
    RankingTooLong,
    #[msg("The provided problem solved number should should be 4 integers long maximum.")]
    ProblemSolvedTooLarge,
    #[msg("The provided acceptance rate should should be 100 percent maximum.")]
    AcceptanceRateTooGood,
    #[msg("The provided stars should should be 5 maximum.")]
    TooManyStars,
}
