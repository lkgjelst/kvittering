import React from 'react';

import Input from './Input';
import PictureUpload from './PictureUpload';
import SignatureUpload from './SignatureUpload';

import styles from './Form.css';
import globals from './globals.css';

const requiredFields = {
  name: true,
  accountNumber: true,
  signature: true,
  mailfrom: true
};

const inputIsValid = form =>
  Object.keys(form)
    .filter(field => requiredFields[field])
    .filter(field => form[field].length === 0).length === 0;

class CreateTemplate extends React.Component {
  state = {
    form: {
      signature: '',
      name: '',
      committee: '',
      accountNumber: '',
      mailfrom: '',
      create_template: true
    },
    submitted: false
  };
  render() {
    const updateForm = state =>
      this.setState({ form: { ...this.state.form, ...state } });
    return (
      <div className={styles.container}>
        <div className={styles.info}>
          Her kan du lage en mal, så du slipper å fylle ut disse feltene i
          fremtiden. Ingen data blir lagret noe sted, du får kun en fil på mail
          du kan laste opp neste gang du skal lage en kvitteringsskildring.
        </div>
        <Input
          name={'Navn'}
          value={this.state.form.name}
          field="name"
          required
          updateForm={updateForm}
        />
        <Input
          name={'Komité'}
          value={this.state.form.committee}
          field="committee"
          updateForm={updateForm}
        />
        <Input
          name={'Kontonummer'}
          value={this.state.form.accountNumber}
          field="accountNumber"
          required
          updateForm={updateForm}
        />
        <Input
          name={'Din epost'}
          value={this.state.form.mailfrom}
          field="mailfrom"
          required
          updateForm={updateForm}
        />
        <SignatureUpload updateForm={updateForm} />

        {inputIsValid(this.state.form) &&
          !this.state.submitted && (
            <button
              className={styles.submit}
              onClick={() => {
                console.log(this.state);
                this.setState({ submitted: true });
                fetch(
                  //'/kaaf', {
                  'https://kaaf.abakus.no/async',
                  {
                    method: 'POST',
                    body: JSON.stringify(this.state.form)
                  }
                );
              }}
            >
              Generer mal
            </button>
          )}

        {this.state.submitted && (
          <div className={styles.feedback}>
            Genererer mal, du vil få den på mail når den er ferdig
          </div>
        )}
      </div>
    );
  }
}

export default CreateTemplate;