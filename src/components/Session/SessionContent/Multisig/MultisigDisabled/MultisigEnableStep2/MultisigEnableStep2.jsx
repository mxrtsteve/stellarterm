import React from 'react';
import PropTypes from 'prop-types';
import Driver from '../../../../../../lib/Driver';

export default class MultisigEnableStep2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publicKey: '',
            valid: false,
            isVaultKey: false,
            isGuardKey: 'noChoosed',
            inputError: '',
            isUpdated: false,
        };
    }

    componentDidUpdate(prevState) {
        if (this.state.publicKey !== prevState.publicKey && !this.state.isUpdated) {
            this.isVaultKey();
        }
    }

    handleInput(e) {
        e.preventDefault();
        this.setState({
            publicKey: e.target.value,
            valid: StellarSdk.StrKey.isValidEd25519PublicKey(e.target.value),
            inputError: '',
            isUpdated: false,
            isVaultKey: false,
        });
    }

    handleSelect(e) {
        this.setState({
            isGuardKey: e.target.value,
            inputError: '',
        });
    }

    goBack() {
        const { submit, d } = this.props;
        submit.cancel();
        if (d.session.account.signers.length === 1) {
            d.modal.handlers.activate('multisigEnableStep1', d);
        }
    }

    isVaultKey() {
        const { publicKey, valid } = this.state;
        if (valid) {
            this.props.d.session.handlers.isLobstrVaultKey(publicKey).then(
                (res) => {
                    this.setState({
                        isVaultKey: res[0].exists,
                        isUpdated: true,
                    });
                },
            );
        }
    }

    addSigner() {
        if (!this.state.valid) {
            this.setState({
                inputError: 'Please, input correct Stellar public Key!',
            });
            return;
        }

        let key;
        if (this.state.isVaultKey) {
            key = 'lobstrVault';
        }
        if (this.props.d.session.account.signers.length > 1 && !this.state.isVaultKey) {
            this.setState({
                inputError: 'You can add additional signatures only with the LOBSTR VAULT',
            });
            return;
        }
        if (this.state.isGuardKey === 'isGuard') {
            key = 'stellarGuard';
        }
        if (!this.state.isVaultKey && this.state.isGuardKey === 'noChoosed') {
            this.setState({
                inputError: 'Please, choose your multisig provider!',
            });
            return;
        }

        this.props.d.session.handlers.addSigner(this.state.publicKey, key)
            .then(() => this.props.submit.cancel())
            .catch((e) => {
                this.setState({ inputError: e });
            });
    }

    render() {
        return (
            <div className="MultisigEnableStep2">
                <strong>Connect multisig signer</strong>
                <span>Enter the public key of the account that will co-sign the transactions.
                Copy this from LOBSTR Vault or your multisig provider.</span>

                <div className="MultisigEnableStep2_input">
                    <label htmlFor="signerkey">Signer public key</label>
                    <input
                        type="text"
                        id="signerkey"
                        maxLength="56"
                        value={this.state.publicKey}
                        onChange={e => this.handleInput(e)}
                        placeholder="Stellar public key" />

                {this.state.isVaultKey ? <span className="MultisigEnableStep2_vault">Lobstr Vault key</span> : null}

                {this.state.valid && !this.state.isVaultKey ?
                    <select value={this.state.isGuardKey} onChange={e => this.handleSelect(e)}>
                        <option defaultValue value="noChoosed">----------</option>
                        <option value="isGuard">Stellar Guard</option>
                        <option value="notGuard">Other</option>
                    </select> :
                    null}
                </div>

                {this.state.inputError &&
                    <span className="MultisigEnableStep2_error">{this.state.inputError}</span>}
                <div className="MultisigEnableStep2_buttons">
                    <button
                        className="s-button"
                        onClick={() => this.goBack()}>
                        Back
                    </button>
                    <button className="s-button" onClick={() => this.addSigner()}>Add signer</button>
                </div>
            </div>
        );
    }
}
MultisigEnableStep2.propTypes = {
    submit: PropTypes.objectOf(PropTypes.func),
    d: PropTypes.instanceOf(Driver),
};

