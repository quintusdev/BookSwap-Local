import { LandingFooter } from "@/components/landing-footer";
import { LandingHeader } from "@/components/landing-header";

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingHeader />
            <main className="flex-1">
                <div className="container mx-auto max-w-3xl py-12 px-6">
                    <h1 className="text-4xl font-bold mb-6">Termini di Servizio</h1>
                    <div className="space-y-6 text-muted-foreground">
                        <p><strong>Ultimo aggiornamento:</strong> 26 Dicembre 2025</p>
                        
                        <h2 className="text-2xl font-semibold text-foreground pt-4">1. Introduzione</h2>
                        <p>Benvenuto in BookSwap Local. Questi Termini di Servizio ("Termini") regolano l'uso della nostra piattaforma e dei servizi offerti. Accedendo o utilizzando il nostro servizio, accetti di essere vincolato da questi Termini.</p>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">2. Servizi Offerti</h2>
                        <p>BookSwap Local fornisce una piattaforma per consentire agli utenti ("Lettori") di scambiare libri tra loro. Le attività commerciali ("Intermediari") possono registrarsi per diventare punti di scambio ufficiali, facilitando gli scambi in un luogo sicuro.</p>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">3. Account Utente</h2>
                        <p>Per utilizzare i nostri servizi, è necessario creare un account. Sei responsabile della riservatezza delle tue credenziali di accesso e di tutte le attività che si verificano sul tuo account. Accetti di notificarci immediatamente qualsiasi uso non autorizzato del tuo account.</p>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">4. Condotta dell'Utente</h2>
                        <p>Accetti di utilizzare la piattaforma in modo responsabile e rispettoso. È vietato pubblicare contenuti illegali, offensivi o inappropriati. Gli scambi devono avvenire in modo corretto e onesto. BookSwap Local non è responsabile per la condizione dei libri o per le interazioni tra utenti al di fuori della piattaforma.</p>
                        
                        <h2 className="text-2xl font-semibold text-foreground pt-4">5. Servizi per Intermediari</h2>
                        <p>Gli Intermediari che si registrano al nostro piano professionale accettano di pagare una tariffa mensile come indicato nella pagina di registrazione. L'abbonamento dà diritto ai vantaggi descritti e può essere annullato in qualsiasi momento. Il ruolo dell'Intermediario è quello di fornire un luogo sicuro per il check-in degli scambi, convalidando i codici forniti dagli utenti.</p>
                        
                        <h2 className="text-2xl font-semibold text-foreground pt-4">6. Limitazione di Responsabilità</h2>
                        <p>Il servizio è fornito "così com'è". BookSwap Local non garantisce che il servizio sarà ininterrotto o privo di errori. In nessun caso saremo responsabili per danni diretti, indiretti, incidentali o consequenziali derivanti dall'uso del nostro servizio.</p>
                        
                        <h2 className="text-2xl font-semibold text-foreground pt-4">7. Modifiche ai Termini</h2>
                        <p>Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Ti informeremo di eventuali modifiche sostanziali. L'uso continuato del servizio dopo tali modifiche costituisce accettazione dei nuovi Termini.</p>

                        <h2 className="text-2xl font-semibold text-foreground pt-4">8. Contatti</h2>
                        <p>Per qualsiasi domanda relativa a questi Termini, ti preghiamo di contattarci a <a href="mailto:support@bookswap.local" className="text-primary underline">support@bookswap.local</a>.</p>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
}
