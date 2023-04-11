// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Box, Container } from '@mui/material';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({

    [theme.breakpoints.up('sm')]: {
        height: '100vh',
    },
}));

// ----------------------------------------------------------------------

export default function TermsOfService() {
    return (
        <Page title="Terms Of Service | DStage - NFT Marketplace">

            <Container
                maxWidth={false}
                sx={{
                    boxShadow: (theme) => ({
                        xs: 0,
                    }),
                    maxWidth: "1300px",
                    pt: "130px",
                }}
            >
                <Box >
                    <Typography variant="h3" paragraph>
                        Terms of Service
                    </Typography>


                    <dl>
                        <Box display="inline-flex"><Box >{"1."}</Box>
                            <Box marginLeft="10px"> Introduction DStage is an NFT marketplace trading platform facilitated by a
                                decentralized team of NFT enthusiasts.  Please read these Terms of service
                                carefully. By using the DStage marketplace, you agree that you have read and
                                understood the terms in these Terms of Service which are applicable to you.
                                These Terms of Service a constitute a legally binding agreement <b>“Agreement” </b>
                                between you and DStage. The Agreement applies to your use of the DStage
                                marketplace. If you do not agree to the Terms of Service please do not use or
                                continue using the DStage marketplace.<br></br>
                            </Box>
                        </Box>

                        <Box display="inline-flex"><Box >{"2."}</Box> <Box marginLeft="10px"> Risk of and by accessing DStage’s marketplace. You undertake, accept and
                            warrant the followings: You accept and acknowledge:<br></br>
                        </Box>
                        </Box>





                        <Box paddingLeft="40px">

                            <Box display="inline-flex"><Box >{"(a)"}</Box> <Box marginLeft="10px">The value of an NFTs is subjective. Prices of NFTs are subject to volatility
                                and fluctuations in the price of cryptocurrency can also materially and
                                adversely affect NFT prices. You undertake that you fully understand this
                                subjectivity and volatility and that you may lose money. <br></br>
                            </Box>
                            </Box>
                            <Box display="inline-flex"><Box >{"(b)"}</Box> <Box marginLeft="10px">A lack  of  use  or  public  interest in  the  creation   and  development  of
                                distributed ecosystems could negatively impact the development of those
                                ecosystems and related applications, and could therefore also negatively
                                impact the potential utility of NFTs.<br></br>
                            </Box>
                            </Box>
                            <Box display="inline-flex"><Box >{"(c)"}</Box> <Box marginLeft="10px">The regulatory regime governing blockchain technologies, non-fungible
                                tokens, cryptocurrency, and other crypto-based items is uncertain, and
                                new   regulations   or   policies   may   materially   adversely   affect   the
                                development of the Service and the utility of NFTs.<br></br>
                            </Box>
                            </Box>
                            <Box display="inline-flex"><Box >{"(d)"}</Box> <Box marginLeft="10px">You   are   solely   responsible   for   any   taxes   that   may   apply   to   your
                                transactions. DStage is and shall not be responsible for determining the
                                taxes that may apply to your NFTs.<br></br>
                            </Box>
                            </Box>
                            <Box display="inline-flex"><Box >{"(e)"}</Box> <Box marginLeft="10px">There are risks associated with purchasing items associated with content
                                created by third parties through peer-to-peer transactions, including but
                                not limited to, the risk of purchasing counterfeit items, mislabeled items,
                                items that are vulnerable to metadata decay, items on smart contracts
                                with bugs, and items that may become untransferable (“NFT Risk Items”).
                                You represent and warrant that you have done sufficient research before
                                making any decisions to sell, obtain, transfer, or otherwise interact with
                                any NFTs or accounts/collections including any NFT Risk Items. DStage
                                shall in no event be liable in the event if you purchase any NFT Risk item. <br></br>
                            </Box>
                            </Box>
                            <Box display="inline-flex"><Box >{"(f)"}</Box> <Box marginLeft="10px" >DStage do not control the public blockchains that you are interacting with
                                and DStage do not control certain smart contracts and protocols that may
                                be integral to your ability to complete transactions on these public
                                blockchains. Additionally, blockchain transactions are irreversible and
                                DStage has no ability to reverse any transactions on the blockchain.<br></br>
                            </Box>
                            </Box>

                            <Box display="inline-flex"><Box >{"(g)"}</Box> <Box marginLeft="10px" >
                                There are risks associated with using Internet and blockchain based
                                products, including, but not limited to, the risk associated with hardware,
                                software, and Internet connections, the risk of malicious software
                                introduction, and the risk that third parties may obtain unauthorized
                                access to your third-party wallet or account. You accept and acknowledge
                                that DStage will not be responsible for any communication failures,
                                disruptions, errors, distortions or delays you may experience when using
                                the DStage marketplace or any Blockchain network, however caused.
                                <br></br>
                            </Box>
                            </Box>

                            <Box display="inline-flex"><Box >{"(h)"}</Box> <Box marginLeft="10px" >
                                DStage service relies on third-party platforms, users and/or vendors. If DStage
                                is unable to maintain a good relationship with such platform providers and/or vendors;
                                if the terms and conditions or pricing of such platform providers and/or vendors change;
                                if we violate or cannot comply with the terms and conditions of such platforms and/or vendors;
                                or if any of such platforms and/or vendors loses market share or falls
                                out of favor or is unavailable for a prolonged period of time, access to and
                                use of the Service will suffer.<br></br>
                            </Box>
                            </Box>

                            <Box display="inline-flex"><Box >{"(i)"}</Box> <Box marginLeft="10px" >
                                DStage reserves the right to hide collections, contracts, and items affected
                                by any of these issues or by other issues. Items you purchase may become
                                inaccessible on DStage. Under no circumstances shall the inability to view
                                items on DStage or an inability to use the service in conjunction with the
                                purchase, sale, or transfer of items available on any blockchains serve as grounds
                                for a claim against DStage.
                                <br></br>
                            </Box>
                            </Box>

                            <Box display="inline-flex"><Box >{"(j)"}</Box> <Box marginLeft="10px" >
                                If you have a dispute with one or more users, YOU RELEASE US FROM CLAIMS,
                                DEMANDS, AND DAMAGES OF EVERY KIND AND NATURE, KNOWN AND UNKNOWN,
                                ARISING OUT OF OR IN ANY WAY CONNECTED WITH SUCH DISPUTES. IN ENTERING
                                INTO THIS RELEASE YOU EXPRESSLY WAIVE ANY PROTECTIONS (WHETHER STATUTORY OR OTHERWISE)
                                THAT WOULD OTHERWISE LIMIT THE COVERAGE OF THIS RELEASE TO INCLUDE THOSE CLAIMS WHICH
                                YOU MAY KNOW OR SUSPECT TO EXIST IN YOUR FAVOR AT THE TIME OF AGREEING TO THIS RELEASE.
                                <br></br>
                            </Box>
                            </Box>


                        </Box>

                        <Box display="inline-flex"><Box >{"3."}</Box>
                            <Box marginLeft="10px">
                                Disclaimers We do not represent or warrant that access to the front-end interface will
                                be continuous, uninterrupted, timely, or secure; that the information contained in
                                the interface will be accurate, reliable, complete, or current; or that the Interface will
                                be free from errors, defects, viruses, or other harmful elements. THE DSTAGE MARKETPLACE IS
                                PROVIDED BY DSTAGE ON AN “AS IS” AND “AS AVAILABLE” BASIS. DSTAGE MAKES NO REPRESENTATIONS
                                OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE DSTAGE MARKETPLACE
                                OR ITS RELATED SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY
                                AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US
                                IS AT YOUR SOLE RISK. NEITHER DSTAGE NOR ANY PERSON ASSOCIATED WITH DSTAGE MAKES ANY WARRANTY
                                OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY,
                                OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER DSTAGE NOR ANYONE
                                ASSOCIATED WITH DSTAGE REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES
                                OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED,
                                THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE
                                OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED
                                THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.

                                <br></br>
                            </Box>
                        </Box>

                        <Box display="inline-flex"><Box >{"4."}</Box>
                            <Box marginLeft="10px">
                                Proprietary Rights We own the intellectual property generated by core contributors
                                to DStage for the use of DStage marketplace, including (but not limited to) software,
                                text, designs, images, and copyrights. Unless otherwise stated, DStage reserves exclusive
                                rights to its intellectual property.
                                <br></br>
                            </Box>
                        </Box>

                        <Box display="inline-flex"><Box >{"5."}</Box>
                            <Box marginLeft="10px">
                                Eligibility To access or use the front-end interface, you represent that you are at
                                least the age of majority in your jurisdiction. You further represent that your access
                                and use of the front-end interface will fully comply with all applicable laws and regulations
                                and that you will not access or use the front-end interface to conduct, promote, or otherwise
                                facilitate any illegal activity. Furthermore, you represent that neither you nor any entity you
                                represent are included in any trade embargoes or sanctions list (“Subject to Restrictions”),
                                nor resident, citizen, national or agent of, or an entity organized, incorporated or doing
                                business in such territories (“Restricted Territories”).

                                <br></br>
                            </Box>
                        </Box>

                        <Box display="inline-flex"><Box >{"6."}</Box>
                            <Box marginLeft="10px">
                                Privacy When you use the front-end interface, the only information we collect from
                                you is your blockchain wallet address, completed transaction hashes, and token identifiers.
                                We do not collect any personal information from you. We do, however, use third-party services
                                like Google Analytics, which may receive your publicly available personal information.
                                We do not take responsibility for any information you make public on the blockchain by
                                taking actions through the front-end interface.
                                <br></br>
                            </Box>
                        </Box>

                        <Box display="inline-flex"><Box >{"7."}</Box>
                            <Box marginLeft="10px">
                                Prohibited Activity You agree not to engage in any of the following categories of prohibited
                                activity in relation to your access and use of the front-end interface: Intellectual property
                                infringement, such as violations to copyright, trademark, service mark or patent. Interaction
                                with assets, listings, smart contracts, and collections that include metadata that may be deemed
                                harmful or illegal, including (but not limited to): metadata that promotes suicide or self-harm,
                                incites hate or violence against others, degrades or doxxes another individual, depicts minors
                                in sexually suggestive situations, or raises funds for terrorist organizations. Transacting in
                                any Restricted Territory or interacting with any blockchain addresses controlled indirectly
                                or directly by persons or entities Subject to Restrictions, that is, included in any trade
                                embargoes or sanctions list.

                                <br></br>
                            </Box>
                        </Box>

                        <Box display="inline-flex"><Box >{"8."}</Box>
                            <Box marginLeft="10px">
                                Limitation of Liability DStage is in no way liable for any damages of any form resulting
                                from your access or use of DStage marketplace, including (but not limited to) any loss of
                                profit, digital assets, or intangible property, and assumes no liability or responsibility
                                for any errors, omissions, mistakes, or inaccuracies in the content provided on DStage-controlled
                                software or media; unauthorized access or use of any server or database controlled by DStage;
                                bugs, viruses etc. in the software; suspension of service; or any conduct of any third party
                                whatsoever. Furthermore, any hyperlink or reference to a third party website, product, or person
                                that is shared or published in any software or other channel by DStage is for your convenience
                                only, and does not constitute an endorsement. We accept no legal responsibility for content
                                or information of such third party sites.
                                <br></br>
                            </Box>
                        </Box>

                        <Box display="inline-flex"><Box >{"9."}</Box>
                            <Box marginLeft="10px">
                                Modification of this Agreement We reserve the right, in our sole discretion, to modify
                                this Agreement. All modifications become effective when they are posted, and we will notify
                                you by updating the date at the top of the Agreement.
                                <br></br>
                            </Box>
                        </Box>

                        <Box display="inline-flex"><Box >{"10."}</Box>
                            <Box marginLeft="2px">
                                These Terms shall be governed and construed in accordance with the laws of the Republic of
                                Singapore. Any disputes, actions, claims or causes of action arising out of or in connection
                                with these Terms of Service (<b>“Disputes“</b>) or the DStage marketplace shall be referred to the
                                Singapore International Arbitration Centre (<b>“SIAC”</b>), in accordance with the Rules of the SIAC
                                as modified or amended from time to time (the <b>“Rules”</b>) by a sole arbitrator appointed by the
                                mutual agreement of you and DStage (the <b>“Arbitrator”</b>). If you and DStage are unable to agree
                                on an arbitrator, the Arbitrator shall be appointed by the President of SIAC in accordance with
                                the Rules. The seat and venue of the arbitration shall be Singapore, in the English language and
                                the fees of the Arbitrator shall be borne equally by you , provided that the Arbitrator may
                                require that such fees be borne in such other manner as the Arbitrator determines is required
                                in order for this arbitration clause to be enforceable under applicable law.
                                <br></br>
                            </Box>
                        </Box>



                    </dl>



                </Box>
            </Container>

        </Page>
    );
}

// ----------------------------------------------------------------------

TermsOfService.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
