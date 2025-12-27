# Firebase Studio

📚 BookSwap Local

BookSwap Local è una web / mobile app che permette lo scambio di libri tra persone della stessa zona, utilizzando luoghi fisici reali (biblioteche, bar, librerie, spazi culturali) come punti di incontro.

Non è un marketplace.
Non ci sono vendite.
Non ci sono spedizioni.

Ci sono persone, libri e luoghi.

🎯 Visione

I libri non devono viaggiare per corriere.

Devono cambiare mani.

BookSwap Local esiste per:

- promuovere la lettura
- ridurre sprechi
- riportare le persone nei luoghi   culturali
- creare relazioni locali reali

L’app funziona solo se esistono luoghi che ospitano gli scambi.

Per questo gli intermediari sono al centro del progetto.

🏛️ Intermediari (cuore del sistema)

Biblioteche, bar, librerie e spazi culturali possono registrarsi come Intermediari BookSwap.

Un intermediario:

diventa punto ufficiale di scambio
compare sulla mappa come luogo attivo
riceve persone fisicamente nel proprio spazio partecipa al programma BookSwap Hub

Abbonamento
20€ / mese

- nessun vincolo
- disdettabile in qualsiasi momento

Il canone non è una commissione:
è un abbonamento di intermediazione locale.

⭐ Feature esclusiva:

BookSwap Hub

BookSwap Hub è una funzionalità visibile solo agli intermediari.

Ogni scambio confermato fisicamente nel locale:

-genera valore
-viene tracciato
-contribuisce a milestone e ricompense

Dashboard intermediari

- numero scambi totali
- scambi mensili
- utenti ricorrenti
- milestone raggiunte
- benefici attivi
- prossima ricompensa

Gli utenti standard non vedono questa dashboard.

🔐 Conferma scambio (QR + codice)

Uno scambio è considerato valido solo se fisico e verificato.

Flusso:

- L’intermediario espone un QR code univoco
- L’utente scansiona il QR nel locale
- L’app apre la schermata di conferma
- L’utente inserisce il codice di scambio
- Lo scambio viene confermato

Solo gli scambi così confermati:

- incrementano i contatori
- sbloccano milestone
- generano ricompense

🏆 Sistema di milestone (Hub)
- Milestone 1 — 10 scambi
- badge “Punto Attivo”
maggiore visibilità sulla mappa
- Milestone 2 — 50 scambi
credito o sconto abbonamento (20€)
badge “Hub di Comunità”
utenti ottengono badge “Reader Locale”
- Milestone 3 — 150 scambi
vantaggi avanzati sull’abbonamento
possibilità di pubblicare eventi
utenti ottengono status “Reader Affezionato”
- Milestone 4 — 300+ scambi
status “BookSwap Partner”
riduzione permanente del canone
visibilità premium
utenti ottengono vantaggi prioritari

👤 Vantaggi per gli utenti

Gli utenti che effettuano scambi ripetuti nello stesso locale:

- accumulano contatori locali
- ottengono badge e status
accedono a vantaggi futuri (eventi, priorità, riconoscimento)
- Questo crea fedeltà reale, non gamification vuota.

🛠️ Stack tecnologico

Backend
- Firebase
Authentication
- Firestore
Cloud Functions
- Hosting
Frontend
- Web / Mobile (in evoluzione)
UI semplice, mobile-first
🗂️ Struttura dati (semplificata)
- Users
users/{userId}
{
  "userType": "private | professional",
  "favoriteLocationId": "locationId",
  "localSwapCount": 12,
  "badges": ["reader_locale"]
}
Locations (Intermediari)
locations/{locationId}
{
  "name": "Caffè Letterario",
  "type": "bar",
  "swapCount": 52,
  "milestoneLevel": 2,
  "subscriptionStatus": "active"
}
Swaps
swaps/{swapId}
{
  "userA": "uid1",
  "userB": "uid2",
  "locationId": "locationId",
  "confirmed": true,
  "confirmedAt": "timestamp"
}

🔐 Sicurezza

- solo utenti autenticati possono effettuare scambi
- solo intermediari possono accedere al BookSwap Hub
- i contatori possono essere incrementati solo tramite scambi verificati
- protezioni anti-abuso e rate limiting logico

📄 Aspetti legali (MVP)

BookSwap Local è una piattaforma di intermediazione
- non è responsabile dello scambio tra utenti
- i dati sono trattati secondo GDPR (Italia)
- pagamenti gestiti da Stripe
Accettazione obbligatoria di:
- Termini di utilizzo
- Privacy Policy

🧪 Stato del progetto

🚧 In sviluppo attivo

Priorità:
- intermediari
- scambi verificati
- BookSwap Hub
- utenti
L’ordine non è negoziabile.

👤 Autore

Progetto ideato e sviluppato da Marco "QuintusDev".
Sviluppatore, lettore, curioso.

🧠 Nota finale (onesta)
BookSwap Local non cresce con più codice.
Cresce con luoghi che lo adottano.
Questo README non descrive un’app.
Descrive un ecosistema locale.