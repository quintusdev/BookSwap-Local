# Firebase Studio

📚 BookSwap Local

BookSwap Local è una web / mobile app che permette lo scambio di libri tra persone della stessa zona, utilizzando **locali commerciali (bar, librerie, spazi culturali)** come punti di scambio ufficiali.

Non è un marketplace.
Non ci sono vendite.
Non ci sono spedizioni.

Ci sono persone, libri e luoghi.

🎯 Visione

I libri non devono viaggiare per corriere. Devono cambiare mani.
La nostra missione è creare un ecosistema locale sostenibile che promuova la lettura, riduca gli sprechi e, soprattutto, **riporti le persone nei luoghi fisici della cultura e della socialità**.

L’app funziona solo se esistono luoghi che ospitano gli scambi. Per questo gli **intermediari commerciali** sono al centro del progetto.

🏛️ Intermediari (cuore del sistema)

Bar, librerie indipendenti e spazi culturali possono registrarsi come **Intermediari BookSwap**.

Un intermediario:
- diventa punto ufficiale di scambio
- compare sulla mappa come luogo attivo
- **riceve persone fisicamente nel proprio spazio**
- partecipa al programma esclusivo BookSwap Hub

Abbonamento
20€ / mese
- nessun vincolo
- disdettabile in qualsiasi momento

Il canone non è una commissione sullo scambio: è un **abbonamento di intermediazione locale** che dà accesso a una community di potenziali nuovi clienti.

⭐ Feature esclusiva: BookSwap Hub

BookSwap Hub è una funzionalità visibile solo agli intermediari. Ogni scambio confermato fisicamente nel locale:
- **genera valore tracciabile**
- contribuisce a milestone e ricompense
- fidelizza sia il locale che i lettori

Dashboard intermediari:
- numero scambi totali
- scambi mensili
- utenti ricorrenti (clienti fidelizzati)
- milestone raggiunte
- benefici attivi
- prossima ricompensa

🔐 Conferma Scambio (QR + Codice)

Uno scambio è considerato valido solo se fisico e verificato.

Flusso:
1. L’intermediario espone un QR code univoco nel suo locale.
2. L’utente scansiona il QR, aprendo la schermata di conferma nell'app.
3. L’utente inserisce il codice di scambio univoco della transazione.
4. Lo scambio viene confermato.

Solo gli scambi così confermati incrementano i contatori e sbloccano ricompense.

🏆 Sistema di Milestone (Hub)

- **Milestone 1 — 10 scambi:** badge “Punto Attivo”, maggiore visibilità sulla mappa.
- **Milestone 2 — 50 scambi:** credito o sconto sull'abbonamento (20€), badge “Hub di Comunità”. Gli utenti ottengono il badge “Reader Locale”.
- **Milestone 3 — 150 scambi:** vantaggi avanzati sull’abbonamento, possibilità di pubblicare eventi. Gli utenti ottengono lo status “Reader Affezionato”.
- **Milestone 4 — 300+ scambi:** status “BookSwap Partner”, riduzione permanente del canone e visibilità premium.

👤 Vantaggi per gli Utenti

Gli utenti che effettuano scambi ripetuti nello stesso locale accumulano contatori, ottengono badge e accedono a vantaggi futuri, creando un legame di fedeltà reale con l'attività commerciale.

---

### Nota sulla Scelta Strategica (Locali vs. Biblioteche)

In questa fase iniziale, il progetto si concentra esclusivamente sui **locali commerciali** come intermediari. Questa scelta strategica è volta a garantire la sostenibilità economica del modello di business attraverso un abbonamento chiaro e a validare il flusso di valore primario: portare nuovi clienti ai negozi.

Le **biblioteche** rappresentano un partner culturale di immenso valore, ma il loro modello non-profit richiede un approccio diverso. Verranno integrate in una fase successiva con modalità dedicate (es. partnership istituzionali, organizzazione di eventi culturali, patrocinio) che non si basino su un modello di abbonamento.

---

🛠️ Stack tecnologico

- **Backend:** Firebase (Authentication, Firestore, Cloud Functions, Hosting)
- **Frontend:** Web / Mobile (in evoluzione, UI semplice e mobile-first)

🗂️ Struttura Dati (semplificata)

- **Users (`users/{userId}`):**
  - `userType`: "private" | "professional"
  - `favoriteLocationId`: "locationId"
  - `localSwapCount`: 12
  - `badges`: ["reader_locale"]
- **Locations (Intermediari - `locations/{locationId}`):**
  - `name`: "Caffè Letterario"
  - `swapCount`: 52
  - `milestoneLevel`: 2
  - `subscriptionStatus`: "active"
- **Swaps (`swaps/{swapId}`):**
  - `userA`, `userB`, `locationId`
  - `confirmed`: true
  - `confirmedAt`: timestamp

🔐 Sicurezza

- Accesso solo per utenti autenticati.
- BookSwap Hub accessibile solo agli intermediari.
- Contatori incrementati solo tramite scambi verificati (anti-abuso).

📄 Aspetti legali (MVP)

- Piattaforma di intermediazione, non responsabile dello scambio.
- Dati trattati secondo GDPR.
- Pagamenti gestiti da Stripe (in futuro).
- Accettazione obbligatoria di Termini e Privacy Policy.

🚧 Stato del progetto

In sviluppo attivo. La priorità è consolidare il modello con gli intermediari commerciali per poi espandere la base utenti. L'ordine non è negoziabile: prima i luoghi, poi le persone.

👤 Autore

Progetto ideato e sviluppato da Marco "QuintusDev".
Sviluppatore, lettore, curioso.
