import React from 'react'
import {Link} from 'react-router-dom'
import "./HowToUse.css"

function HowToUse() {
    return (
        <div className="about">
            <div className="heading-container">
                <div className="title">SOLANA x LEETDROID</div>
            </div>
            <div className="content">
                Dapps are decentralized apps. They are like normal apps, and offer similar functions, but the key
                difference is they are run on a peer-to-peer network, such as a <strong>blockchain</strong>. That means
                no one person or entity has control of the network. This dApps provides a way to add your leetcode
                profile into Solana Blockchain and provide a cool profile card along with it. <br/>
                To get one, you have to follow these steps: <br/>

                <ul>
                    <li>To get started go to the <Link to="/"> Homepage </Link> and click on the <strong>Get your own
                        profile card</strong> button.
                    </li>

                    <li>You will now be redirected to upload profile page. Here you have to add
                        your <strong>LeetCode</strong> username and click on <strong>Get Profile.</strong></li>

                    <li>You should be seeing your profile card.</li>
                    <li>Now time for transaction. Connect your wallet by clicking on <strong>Select
                        wallet</strong> button. The dApp supports phantom and sollet wallets and you can use any of them
                        to continue the next steps.
                        <br/>But if you dont have the wallet accounts yet then here is the <a
                            href="https://phantom.app/">extension </a> and <a
                            href='https://news.coincu.com/2433-the-easiest-guide-to-using-phantom-wallet-on-solana/'>tutorial</a> link
                        to help you get done with the transaction :)
                    </li>

                    <li>Once the wallet is connected, it will showcase the address of the connected wallet on the
                        button.
                    </li>

                    <li>The dApp has been deployed on Devnet, hence you will require Devnet Solana coins(SOL) to make
                        the transaction, you can get them by requesting an airdrop from <a
                            href='https://solfaucet.com/'>here</a>.
                    </li>

                    <li>Now we are ready to add our LeetCode profile to blockchain. Click on Send Profile button that is
                        below your profile card.
                    </li>

                    <li>A new pop-up will appear which will ask for your approval of the transaction. It will also show
                        the transaction fees along with it.
                    </li>

                    <li>Once the transaction is done you will see the congratulation text with your transaction ID.</li>

                    <li>And your profile is on the <strong>blockchain</strong>, yay!</li>

                    <li>You can verify the transaction yourself, by either clicking on the <strong>Verify
                        Transaction</strong> or copying the transaction id and search it on any solana explorer. If you
                        are checking manually then do not forget to check it on devnet.
                    </li>

                    <li>Now to download your LeetCode profile card, you can copy the transaction ID and paste it in home
                        page and click on <strong>Get Transaction</strong>. You will see your data that was sent to
                        blockchain in your profile card. Once its populated you can download the profile card by
                        clicking it on Download button.
                    </li>
                    <li>One can regenerate their profile card by going to the home page and inputting the transaction
                        ID.
                    </li>
                    <li>Do not forget it to share your personal profile card on different social medias.</li>

                    <li>Also you do not have to remember your transaction id if you have your profile card as the
                        profile card contains the QR code which shows the transaction ID after scanning it.
                    </li>
                </ul>

                <br/>
            </div>
        </div>
    )
}

export default HowToUse;