import React from 'react';
import PropTypes from 'prop-types';
import Driver from '../../../../../lib/Driver';


export default class MultisigDisabled extends React.Component {
    multisigEnable() {
        this.props.d.modal.handlers.activate('multisigEnableStep1', this.props.d);
    }
    render() {
        return (
            <div className="so-back islandBack">
                <div className="island">
                    <div className="island__header">Multisig</div>
                    <div className="MultisigDisabled">
                        <div className="MultisigDisabled_row">
                            <span>Multisig disabled</span>
                            <button className="s-button" onClick={() => this.multisigEnable()}>Enable</button>
                        </div>
                        <span className="MultisigDisabled_hint">
                            Multisignature improves your wallet {''}
                            security by requiring additional approvals for each transaction.
                        </span>
                        <a
                            href="https://lobstr.zendesk.com/hc/en-us/categories/360001534333-LOBSTR-Vault"
                            target="_blank">
                            Read more about multisig
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
MultisigDisabled.propTypes = {
    d: PropTypes.instanceOf(Driver).isRequired,
};
