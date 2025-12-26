import { LandingFooter } from "@/components/landing-footer";
import { LandingHeader } from "@/components/landing-header";

export default function PrivacyPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingHeader />
            <main className="flex-1">
                <div className="container mx-auto max-w-3xl py-12 px-6">
                    <h1 className="text-4xl font-bold mb-6">Informativa sulla Privacy</h1>
                    <div className="space-y-6 text-muted-foreground">
                        <p><strong>Ultimo aggiornamento:</strong> 26 Dicembre 2025</p>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">1. Titolare del Trattamento</h2>
                        <p>BookSwap Local ("noi", "nostro") è il titolare del trattamento dei tuoi dati personali.</p>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">2. Dati che Raccogliamo</h2>
                        <p>Raccogliamo le seguenti categorie di dati personali:</p>
                        <ul>
                            <li><strong>Dati forniti da te:</strong> Nome, indirizzo email, città e, se sei un intermediario, nome e indirizzo dell'attività.</li>
                            <li><strong>Dati sull'utilizzo:</strong> Informazioni su come utilizzi la nostra piattaforma, inclusi gli scambi effettuati e le interazioni.</li>
                            <li><strong>Dati di Localizzazione:</strong> Se fornisci il consenso, possiamo raccogliere la tua posizione per suggerirti libri nelle vicinanze.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">3. Come Utilizziamo i Tuoi Dati</h2>
                        <p>Utilizziamo i tuoi dati per:</p>
                        <ul>
                            <li>Fornire, mantenere e migliorare i nostri servizi.</li>
                            <li>Facilitare gli scambi di libri e la comunicazione tra utenti.</li>
                            <li>Personalizzare la tua esperienza, ad esempio suggerendoti libri pertinenti.</li>
                            <li>Comunicare con te riguardo al tuo account e ai nostri servizi.</li>
                            <li>Garantire la sicurezza della nostra piattaforma.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">4. Condivisione dei Dati</h2>
                        <p>Non vendiamo i tuoi dati personali. Potremmo condividere i tuoi dati nelle seguenti circostanze:</p>
                        <ul>
                            <li><strong>Con altri utenti:</strong> Il tuo nome e la tua città sono visibili agli altri utenti per facilitare gli scambi.</li>
                            <li><strong>Con fornitori di servizi:</strong> Utilizziamo fornitori di terze parti (come provider di hosting) che trattano i dati per nostro conto.</li>
                            <li><strong>Per motivi legali:</strong> Se richiesto dalla legge o per proteggere i nostri diritti.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">5. I Tuoi Diritti (GDPR)</h2>
                        <p>In base al GDPR, hai il diritto di:</p>
                        <ul>
                            <li>Accedere ai tuoi dati personali.</li>
                            <li>Richiedere la rettifica di dati inesatti.</li>
                            <li>Richiedere la cancellazione dei tuoi dati.</li>
                            <li>Opporti al trattamento dei tuoi dati.</li>
                            <li>Richiedere la portabilità dei dati.</li>
                        </ul>
                        <p>Puoi esercitare questi diritti contattandoci all'indirizzo fornito di seguito.</p>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">6. Sicurezza dei Dati</h2>
                        <p>Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i tuoi dati personali da accessi, modifiche o distruzioni non autorizzate.</p>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">7. Contatti</h2>
                        <p>Per qualsiasi domanda relativa a questa Informativa sulla Privacy o per esercitare i tuoi diritti, ti preghiamo di contattarci a <a href="mailto:privacy@bookswap.local" className="text-primary underline">privacy@bookswap.local</a>.</p>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
}
