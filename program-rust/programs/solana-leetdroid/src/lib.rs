use anchor_lang::prelude::*;
use serde::{Deserialize, Serialize};

declare_id!("E3s8VLFoVor6k7oXC6yrsCpgvJoky26zPceeF8eGBPtD");

#[program]
pub mod solana_leetdroid {
    use super::*;

    pub fn send_profile(
        ctx: Context<SendProfile>,
        username: String,
        name: String,
        pic_url: String,
        bio: String,
        ranking: String,
        problem_solved: i32,
        acceptance_rate: f32,
        stars: i8,
        all_question_count: String,
        ac_submissin_num: String,
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
        if pic_url.chars().count() > 280 {
            return Err(ErrorCode::PicUrlTooLong.into());
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
            timestamp: clock.unix_timestamp,
            username: username.to_string(),
            name: name.to_string(),
            pic_url: pic_url.to_string(),
            bio: bio.to_string(),
            ranking: ranking.to_string(),
            problem_solved,
            acceptance_rate,
            stars,
            all_question_count: all_question_count.to_string(),
            ac_submissin_num: ac_submissin_num.to_string(),
        };
        let serialized_account = serde_json::to_string(&account).unwrap();

        msg!("{}", serialized_account);
        profile.owner = *author.key;
        profile.timestamp = clock.unix_timestamp;
        profile.username = username;
        profile.name = name;
        profile.pic_url = pic_url;
        profile.bio = bio;
        profile.ranking = ranking;
        profile.problem_solved = problem_solved;
        profile.acceptance_rate = acceptance_rate;
        profile.stars = stars;
        profile.all_question_count = all_question_count;
        profile.ac_submissin_num = ac_submissin_num;

        Ok(())
    }
}

// for logs
#[derive(Serialize, Deserialize, Debug)]
struct LeetcodeAccount {
    pub timestamp: i64,
    pub username: String,
    pub name: String,
    pub pic_url: String,
    pub bio: String,
    pub ranking: String,
    pub problem_solved: i32,
    pub acceptance_rate: f32,
    // max 100.00
    pub stars: i8,
    pub all_question_count: String,
    pub ac_submissin_num: String,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = author, space = 8 + 1000)]
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
    pub pic_url: String,
    pub bio: String,
    pub ranking: String,
    pub problem_solved: i32,
    pub acceptance_rate: f32,
    // max 100.00
    pub stars: i8,
    pub all_question_count: String,
    pub ac_submissin_num: String,
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
// ~280 chars max --estimated max value
const PIC_URL_LENGTH: usize = 280 * 4;
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

// JSON objects
// ~ 150-170 chars -- estimated
const ALL_QUES_COUNT_LENGTH: usize = 170 * 4;
// ~ 280 chars -- estimated
const AC_SUBMISSION_NUM_LENGTH: usize = 280 * 4;

impl LeetCodeAccount {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH
        + TIMESTAMP_LENGTH
        + STRING_LENGTH_PREFIX
        + USERNAME_LENGTH
        + STRING_LENGTH_PREFIX
        + NAME_LENGTH
        + STRING_LENGTH_PREFIX
        + PIC_URL_LENGTH
        + STRING_LENGTH_PREFIX
        + BIO_LENGTH
        + STRING_LENGTH_PREFIX
        + RANKING_LENGTH
        + PROBLEM_SOLVED_LENGTH
        + ACCEPTANCE_RATE_LENGTH
        + STARS_LENGTH
        + ALL_QUES_COUNT_LENGTH
        + STRING_LENGTH_PREFIX
        + AC_SUBMISSION_NUM_LENGTH
        + STRING_LENGTH_PREFIX;
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided username should be 50 characters long maximum.")]
    UsernameTooLong,
    #[msg("The provided name should be 50 characters long maximum.")]
    NameTooLong,
    #[msg("The provided bio should be 200 characters long maximum.")]
    BioTooLong,
    #[msg("The provided pic URL should be 280 characters long maximum.")]
    PicUrlTooLong,
    #[msg("The provided ranking should be 10 characters long maximum.")]
    RankingTooLong,
    #[msg("The provided problem solved number should should be 4 integers long maximum.")]
    ProblemSolvedTooLarge,
    #[msg("The provided acceptance rate should should be 100 percent maximum.")]
    AcceptanceRateTooGood,
    #[msg("The provided stars should should be 5 maximum.")]
    TooManyStars,
}
