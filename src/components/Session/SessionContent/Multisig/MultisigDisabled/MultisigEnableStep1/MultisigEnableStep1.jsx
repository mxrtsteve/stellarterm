import React from 'react';
import PropTypes from 'prop-types';
import Driver from '../../../../../../lib/Driver';

const images = require('../../../../../../images');

export default function MultisigEnableStep1(props) {
    const { submit, d } = props;
    return (
        <div className="MultisigEnableStep1">
            <strong>Install LOBSTR Vault</strong>
            <span>Multisignature works best with LOBSTR Vault - mobile app for signing transactions</span>
            <div className="MultisigEnableStep1_images">
                <img src={images['sign-vault']} alt="vault" width="100" height="100" />
                <div className="MultisigEnableStep1_mobile">
                    <a href="https://play.google.com/store/apps/details?id=com.lobstr.stellar.vault" target="_blank">
                        <img src="https://static.lobstr.co/static/lobstr/images/apps/google-play-badge.svg" alt="android" />
                    </a>
                    <a href="https://itunes.apple.com/us/app/lobstr-vault/id1452248529?ls=1&mt=8" target="_blank">
                        <img src="https://static.lobstr.co/static/lobstr/images/apps/i-os-badge.svg" alt="android" />
                    </a>
                </div>
            </div>
            <div className="MultisigEnableStep1_buttons">
                <button className="s-button" onClick={() => submit.cancel()}>Cancel</button>
                <button
                    className="s-button"
                    onClick={() => {
                        submit.cancel();
                        d.modal.handlers.activate('multisigEnableStep2', d);
                    }}>
                    Next
                </button>
            </div>
        </div>
    );
}
MultisigEnableStep1.propTypes = {
    submit: PropTypes.objectOf(PropTypes.func),
    d: PropTypes.instanceOf(Driver),
};
