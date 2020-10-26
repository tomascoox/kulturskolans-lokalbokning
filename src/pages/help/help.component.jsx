import React from 'react';

import './help.styles.scss';

const Help = () => (
  <div className="help">
    <h1>INSTRUKTIONER</h1>
    <h2>Visa en lokals bokningar</h2>
    <p>
      Gå till SCHEMAN. Tryck på lokalrubriken och välj din eftersökta lokal i
      menyn.
    </p>
    <h2>Lägga in ny bokning</h2>
    <p>
      Se till att du är inloggad med ditt konto. Gå till aktuell lokal enligt
      ovan och tryck sen på BOKA i menyn och fyll i uppgifterna.
    </p>
    <h2>Ta bort eller ändra bokning</h2>
    <p>
      Se till att du är inloggad med ditt konto. Klicka eller tryck på en av
      dina bokningar och ändra tid och/eller dag eller radera.
    </p>
    <h2>Lägga in en skolas egna bokningar/reservationer (dom röda)</h2>
    <p>
      Logga in med det gemensamma skolkontot skolans@egnabokningar.se. Gå sen
      till aktuell lokal och tryck sen på ny bokning och fyll i uppgifterna.
      Glöm inte att logga ut igen och logga in ert eget konto.
    </p>
    <h2>
      Detta är en tidig beta-version av appen så hojta så fort ni hittar
      konstigheter och framförallt kom med tips för vidare utveckling. Rock on!
      /Tomas
    </h2>
  </div>
);

export default Help;
