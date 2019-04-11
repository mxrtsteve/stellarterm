import React from 'react';
import PropTypes from 'prop-types';
import SignerDataRow from './SignerDataRow/SignerDataRow';
import Driver from '../../../../../lib/Driver';


export default class MultisigEnabled extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlyVaultSigners: true,
        };
    }

    getSigners() {
        const { signers } = this.props.d.session.account;
        return signers.sort((a, b) => a.key.localeCompare(b.key)).map(signer => (
            <SignerDataRow
                key={signer.key}
                signer={signer}
                d={this.props.d}
                noVault={() => this.checkNoVaultSigner()} />
        ));
    }

    checkNoVaultSigner() {
        this.setState({ onlyVaultSigners: false });
    }

    addNewSigner() {
        this.props.d.modal.handlers.activate('multisigEnableStep2', this.props.d);
    }

    render() {
        return (
            <div className="so-back islandBack">
                <div className="island">
                    <div className="island__header">Multisig</div>
                    <div className="MultisigEnabled">
                        <div>Multisig enabled</div>
                        {this.getSigners()}
                        {this.state.onlyVaultSigners &&
                            <button className="s-button" onClick={() => this.addNewSigner()}>Add new signer</button>}
                    </div>
                </div>
            </div>
        );
    }
}
MultisigEnabled.propTypes = {
    d: PropTypes.instanceOf(Driver).isRequired,
};
