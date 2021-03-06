import React from 'react';
import { Redirect } from 'react-router-dom';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';
import { useAuth } from '../../contexts/authentication';
import NAVIGATION from '../../navigation.json';

export default function Home() {
  const usages = ['vos amis.', 'votre coloc.', 'votre partenaire.'];
  const usagesTypings = (
    <TypistLoop interval={1000}>
      {usages.map((text) => (
        <Typist className="is-inline" key={text} startDelay={500}>
          <span>
            {text}
          </span>
          <Typist.Backspace count={text.length} delay={500} />
        </Typist>
      ))}
    </TypistLoop>
  );

  const { authToken } = useAuth();
  if (authToken) {
    return <Redirect to={NAVIGATION.EXPENSES} />;
  }
  return (
    <>
      <div className="card">
        <div className="card-content">
          <div className="title">
            Organisez vos dépenses avec&nbsp;
            {usagesTypings}
          </div>
          <p>
            Partagez vos dépenses de façon facile et équitable.&nbsp;
            Inscrivez-vous, créez un groupe, partagez-le aux personnes concernées,&nbsp;
            et commencez à collaborer !
          </p>
        </div>
      </div>
    </>
  );
}
