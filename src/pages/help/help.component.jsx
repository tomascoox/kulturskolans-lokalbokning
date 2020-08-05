import React from 'react';

import './help.styles.scss';

const Help = () => (
  <div className="help">
    <h1>INSTRUKTIONER</h1>
    <h2>Visa en lokals bokningar</h2>
    <p>
      Tryck på vald lokals namn och välj ny i menyn. Du kan även söka genom att
      skriva första bokstaven eller fler på den skola lokalen är på.
    </p>
    <h2>Lägga in ny bokning</h2>
    <p>
      Se till att du är inloggad med ditt konto (be Tomas om uppgifter). Gå sen
      till aktuell lokal och tryck sen på NY BOKNING i menyn och fyll i
      uppgifterna.
    </p>
    <h2>Ta bort/ändra bokning</h2>
    <p>
      Se till att du är inloggad med ditt konto (be Tomas om uppgifter).
      Klicka/tryck på en av dina bokningar och ändra tiden eller radera.
    </p>
    <h2>Lägga in en skolas egna bokningar/reservationer</h2>
    <p>
      Har gjort det enkelt så vi alla kan lägga in skolornas egna reservationer.
      Logga in med det gemensamma skolkontot skolans@egnabokningar.se (be Tomas
      om lösenord). Gå sen till aktuell lokal och tryck sen på ny bokning och
      fyll i uppgifterna. Glöm inte att logga ut igen och logga in ert eget
      konto.
    </p>
    <h2>
      Detta är en tidig beta-version av appen så hojta så fort ni hittar
      konstigheter och framförallt kom med tips för vidare utveckling. Rock on!
      /Tomas
    </h2>
  </div>
);

export default Help;