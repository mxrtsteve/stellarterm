import React from 'react';
import PropTypes from 'prop-types';
import CopyButton from './../../../../../CopyButton';
import Ellipsis from './../../../../../Ellipsis';
import Driver from '../../../../../../lib/Driver';


export default class SignerDataRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyName: '',
            canRemove: false,
            isButtonReady: true,
        };
    }

    componentDidMount() {
        this.checkSigner(this.props.signer);
    }

    checkSigner({ key }) {
        if (key === 'GA2T6GR7VXXXBETTERSAFETHANSORRYXXXPROTECTEDBYLOBSTRVAULT') {
            this.setState({ keyName: 'Stellar Vault marker key' });
            return;
        }

        if (key === 'GCVHEKSRASJBD6O2Z532LWH4N2ZLCBVDLLTLKSYCSMBLOYTNMEEGUARD') {
            this.setState({ keyName: 'Stellar Guard marker key' });
            return;
        }

        if (key === this.props.d.session.account.account_id) {
            this.setState({ keyName: 'Your account key' });
            return;
        }

        this.props.d.session.handlers.isLobstrVaultKey(key).then(
            (res) => {
                const isVault = res[0].exists;
                if (!isVault) {
                    this.props.noVault();
                }

                this.setState({
                    keyName: isVault ? 'Stellar Vault signer key' : 'Signer key',
                    canRemove: true,
                });
            },
        );
    }

    removeSigner() {
        this.setState({ isButtonReady: false });
        this.props.d.session.handlers.removeSigner(this.props.signer.key)
            .then((res) => {
                if (res.status === 'await_signers') {
                    this.setState({ isButtonReady: true });
                }
            })
            .catch(e => console.error(e));
    }

    render() {
        if (!this.state.keyName) {
            return (
                <div>
                    <span>
                        Load signer data <Ellipsis />
                    </span>
                </div>
            );
        }

        const { signer } = this.props;

        return (
            <div className="SignerDataRow">
                <div className="SignerDataRow_data">
                    <div className="SignerDataRow_type">{this.state.keyName}</div>
                    <div className="SignerDataRow_key">{signer.key}</div>
                    <CopyButton text={signer.key} />
                    <div className="SignerDataRow_weight">{signer.weight}</div>
                </div>
                {this.state.canRemove &&
                <button className="s-button" onClick={() => this.removeSigner()} disabled={!this.state.isButtonReady}>
                    Remove signer
                </button>
                }
            </div>
        );
    }

}
SignerDataRow.propTypes = {
    signer: PropTypes.shape({
        key: PropTypes.string,
        weight: PropTypes.number,
    }),
    d: PropTypes.instanceOf(Driver).isRequired,
    noVault: PropTypes.func,
};
