import * as anchor from "@project-serum/anchor";
import {Program} from "@project-serum/anchor";
import {SolanaLeetdroid} from "../target/types/solana_leetdroid";
import * as assert from "assert";
import * as bs58 from "bs58";

describe("solana-leetdroid", () => {

    // const provider = anchor.Provider.local("http://127.0.0.1:8899");
    // anchor.setProvider(provider);
    anchor.setProvider(anchor.Provider.env());
    const program = anchor.workspace.SolanaLeetdroid as Program<SolanaLeetdroid>;

    it('can create a new profile', async () => {
        const profile = anchor.web3.Keypair.generate();

        await program.rpc.sendProfile('cdhiraj40', 'Dhiraj','https://picsum.photos/200', 'Hey this is Dhiraj', '1001', 10, 55.56, 2,"146","2251", {
            accounts: {
                // account share...
                profile: profile.publicKey,
                author: program.provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers:
            // Key pairs of signers here...
                [profile],
        });

        // After sending the transaction to the blockchain.
        // Fetch the account details of the created LeetDroid account.
        const leetdroidAccount = await program.account.leetCodeAccount.fetch(profile.publicKey);

        // Ensure it has the right data.
        assert.equal(leetdroidAccount.owner.toBase58(), program.provider.wallet.publicKey.toBase58());
        assert.equal(leetdroidAccount.username, 'cdhiraj40');
        assert.equal(leetdroidAccount.name, 'Dhiraj');
        assert.equal(leetdroidAccount.bio, 'Hey this is Dhiraj');
        assert.equal(leetdroidAccount.ranking, '1001');
        assert.equal(leetdroidAccount.problemSolved, 10);
        assert.equal(Math.round(leetdroidAccount.acceptanceRate * 100) / 100, 55.56);
        assert.equal(leetdroidAccount.stars, 2);
        assert.ok(leetdroidAccount.timestamp);
    });

    it('can create a new profile without a bio', async () => {
        // Call the "SendProfile" instruction without a bio.
        const profile = anchor.web3.Keypair.generate();

        await program.rpc.sendProfile('cdhiraj40', 'Dman','https://picsum.photos/200', '', '11001', 110, 69.56, 2,"146","2251", {
            accounts: {
                // Account share...
                profile: profile.publicKey,
                author: program.provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers:
            // Key pairs of signers here...
                [profile],
        });

        // After sending the transaction to the blockchain.
        // Fetch the account details of the created LeetDroid account.
        const leetdroidAccount = await program.account.leetCodeAccount.fetch(profile.publicKey);

        // Ensure it has the right data.
        assert.equal(leetdroidAccount.owner.toBase58(), program.provider.wallet.publicKey.toBase58());
        assert.equal(leetdroidAccount.username, 'cdhiraj40');
        assert.equal(leetdroidAccount.name, 'Dman');
        assert.equal(leetdroidAccount.bio, '');
        assert.equal(leetdroidAccount.ranking, '11001');
        assert.equal(leetdroidAccount.problemSolved, 110);
        assert.equal(Math.round(leetdroidAccount.acceptanceRate * 100) / 100, 69.56);
        assert.equal(leetdroidAccount.stars, 2);
        assert.ok(leetdroidAccount.timestamp);
    });

    // the reason we have to airdrop here because every time a new local ledger is created,
    // it automatically airdrops 500 million SOL to your local wallet
    it('can create a new profile from a different owner', async () => {
        // Generate another user and airdrop them some SOL.
        const tempUser = anchor.web3.Keypair.generate();

        // requesting 1 SOL or 1 Billion lamports
        const signature = await program.provider.connection.requestAirdrop(tempUser.publicKey, 1000000000);
        await program.provider.connection.confirmTransaction(signature);

        // Call the "SendProfile" instruction on behalf of this other user.
        const profile = anchor.web3.Keypair.generate();

        await program.rpc.sendProfile('cdhiraj40', 'Dman','https://picsum.photos/200', 'Hey this is Dman', '11001', 110, 69.56, 2,"146","2251", {
            accounts: {
                // Account share...
                profile: profile.publicKey,
                author: tempUser.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers:
            // Note that Anchor will only automatically sign transactions using our wallet which is why we need to explicitly sign here.
                [tempUser, profile],
        });

        // After sending the transaction to the blockchain.
        // Fetch the account details of the created LeetDroid account.
        const leetdroidAccount = await program.account.leetCodeAccount.fetch(profile.publicKey);

        // Ensure it has the right data.
        assert.equal(leetdroidAccount.owner.toBase58(), tempUser.publicKey.toBase58());
        assert.equal(leetdroidAccount.username, 'cdhiraj40');
        assert.equal(leetdroidAccount.name, 'Dman');
        assert.equal(leetdroidAccount.bio, 'Hey this is Dman');
        assert.equal(leetdroidAccount.ranking, '11001');
        assert.equal(leetdroidAccount.problemSolved, 110);
        assert.equal(Math.round(leetdroidAccount.acceptanceRate * 100) / 100, 69.56);
        assert.equal(leetdroidAccount.stars, 2);
        assert.ok(leetdroidAccount.timestamp);
    });

    it('cannot provide a username with more than 50 characters', async () => {
        try {
            const profile = anchor.web3.Keypair.generate();

            const usernameWith51Chars = 'a'.repeat(51);
            await program.rpc.sendProfile(usernameWith51Chars, 'Dman','https://picsum.photos/200', 'Hey this is Dman', '11001', 110, 69.56, 2,"146","2251", {
                accounts: {
                    profile: profile.publicKey,
                    author: program.provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                },
                signers: [profile],
            });
        } catch (error) {
            assert.equal(error.msg, "The provided username should be 50 characters long maximum.");
            return;
        }
    });

    it('cannot provide a name with more than 50 characters', async () => {
        try {
            const profile = anchor.web3.Keypair.generate();

            const nameWith51Chars = 'a'.repeat(51);
            await program.rpc.sendProfile('cdhiraj40', nameWith51Chars,'https://picsum.photos/200', 'Hey this is Dman', '11001', 110, 69.56, 2,"146","2251", {
                accounts: {
                    profile: profile.publicKey,
                    author: program.provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                },
                signers: [profile],
            });
        } catch (error) {
            assert.equal(error.msg, "The provided name should be 50 characters long maximum.");
            return;
        }
    });

    it('cannot provide a bio with more than 200 characters', async () => {
        try {
            const profile = anchor.web3.Keypair.generate();

            const bioWith201Chars = 'a'.repeat(201);
            await program.rpc.sendProfile('cdhiraj40', 'Dman','https://picsum.photos/200', bioWith201Chars, '11001', 110, 69.56, 2,"146","2251", {
                accounts: {
                    profile: profile.publicKey,
                    author: program.provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                },
                signers: [profile],
            });
        } catch (error) {
            assert.equal(error.msg, "The provided bio should be 200 characters long maximum.");
            return;
        }
    });

    it('cannot provide a ranking with more than 10 characters', async () => {
        try {
            const profile = anchor.web3.Keypair.generate();

            const ranking = '1'.repeat(11);
            await program.rpc.sendProfile('cdhiraj40', 'Dman','https://picsum.photos/200', 'Hey this is Dman', ranking, 110, 69.56, 2,"146","2251", {
                accounts: {
                    profile: profile.publicKey,
                    author: program.provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                },
                signers: [profile],
            });
        } catch (error) {
            assert.equal(error.msg, "The provided ranking should be 10 characters long maximum.");
            return;
        }
    });

    it('cannot provide number of problem solved longer than 4 digits', async () => {
        try {
            const profile = anchor.web3.Keypair.generate();

            const problemSolved = 1002112;
            await program.rpc.sendProfile('cdhiraj40', 'Dman','https://picsum.photos/200', 'Hey this is Dman', '11001', problemSolved, 69.56, 2,"146","2251", {
                accounts: {
                    profile: profile.publicKey,
                    author: program.provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                },
                signers: [profile],
            });
        } catch (error) {
            assert.equal(error.msg, "The provided problem solved number should should be 4 integers long maximum.");
            return;
        }
    });

    it('cannot provide acceptance rate greater than 100 percent', async () => {
        try {
            const profile = anchor.web3.Keypair.generate();

            const acceptanceRate = 101.00;
            await program.rpc.sendProfile('cdhiraj40', 'Dman','https://picsum.photos/200', 'Hey this is Dman', '11001', 110, acceptanceRate, 2,"146","2251", {
                accounts: {
                    profile: profile.publicKey,
                    author: program.provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                },
                signers: [profile],
            });
        } catch (error) {
            assert.equal(error.msg, "The provided acceptance rate should should be 100 percent maximum.");
            return;
        }
    });

    it('cannot provide stars more than 5', async () => {
        try {
            const profile = anchor.web3.Keypair.generate();

            const stars = 6;
            await program.rpc.sendProfile('cdhiraj40', 'Dman','https://picsum.photos/200', 'Hey this is Dman', '11001', 110, 69.56, stars,"146","2251", {
                accounts: {
                    profile: profile.publicKey,
                    author: program.provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                },
                signers: [profile],
            });
        } catch (error) {
            assert.equal(error.msg, "The provided stars should should be 5 maximum.");
            return;
        }
    });

    it('can fetch all profile', async () => {
        const accounts = await program.account.leetCodeAccount.all();
        assert.equal(accounts.length, 3);
    });

    it('can filter accounts by author', async () => {
        const authorPublicKey = program.provider.wallet.publicKey
        const accounts = await program.account.leetCodeAccount.all([
            {
                memcmp: {
                    offset: 8, // Discriminator.
                    bytes: authorPublicKey.toBase58(),
                }
            }
        ]);

        assert.equal(accounts.length, 2);

        assert.ok(accounts.every(leetcodeAccount => {
            return leetcodeAccount.account.owner.toBase58() === authorPublicKey.toBase58()
        }))
    });

    it('can filter profile by username', async () => {
        const accounts = await program.account.leetCodeAccount.all([
            {
                memcmp: {
                    offset: 8 + // Discriminator.
                        32 + // Author public key.
                        8 + // Timestamp.
                        4, // username string prefix.
                    bytes: bs58.encode(Buffer.from('cdhiraj40')),
                }
            }
        ]);

        assert.equal(accounts.length, 3);
        assert.ok(accounts.every(leetcodeAccount => {
            return leetcodeAccount.account.username === 'cdhiraj40'
        }))
    });

});

