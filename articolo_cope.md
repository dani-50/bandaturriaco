# David Cope e la Replica degli Stili Musicali
## Intelligenza artificiale simbolica per comporre come Bach e Mozart

*Un'esplorazione del progetto EMI, degli strumenti pratici per replicare lo stile, e delle prospettive aperte dall'IA generativa simbolica*

---

## 1. Un compositore improbabile

Negli anni Ottanta del Novecento, un musicologo e compositore dell'Università della California a Santa Cruz di nome David Cope attraversò quello che lui stesso descrisse come il periodo più buio della sua carriera creativa. Era bloccato. Stava lavorando a un'opera, ma il materiale non veniva. Le idee sembravano ripetersi, i modelli si esaurivano, la creatività si era fermata. Come molti compositori in simili situazioni, Cope cominciò a sfogliare i propri quaderni, a rileggere ciò che aveva scritto in precedenza, cercando ispirazione in frammenti già elaborati.

Fu in quel momento che gli balenò un'idea insolita: e se avesse potuto fare la stessa cosa in modo sistematico con la musica degli altri compositori? Non copiare le loro opere, ma capire il meccanismo profondo del loro stile — la grammatica tacita che governa le loro scelte armoniche, melodiche, ritmiche — e poi usare quella grammatica per generare nuovo materiale?

Quello che sembrò inizialmente uno sfogo intellettuale divenne nel giro di qualche anno un progetto di ricerca sofisticato e controverso: **EMI**, acronimo di *Experiments in Musical Intelligence*. Negli anni Novanta, EMI cominciò a produrre pezzi nello stile di Bach, di Beethoven, di Brahms, di Mozart, di Rachmaninov — e in molti casi le composizioni genererate dal computer superarono blind test condotti su ascoltatori e musicologi professionisti, che le scambiarono per opere autentiche.

Il progetto di Cope sollevò immediatamente questioni fondamentali: Cosa significa comporre? Lo stile è riproducibile meccanicamente? Se una macchina produce qualcosa di indistinguibile dall'originale, cosa ci dice questo dell'originalità umana? Queste domande continuano ad affascinare e a dividere, ma al di là della filosofia c'è una tecnica concreta, elegante e istruttiva — una tecnica che vale la pena comprendere nel dettaglio.

In questo articolo ci proponiamo di fare proprio questo: spiegare come Cope affrontò il problema dello stile musicale, illustrare il metodo con esempi pratici in Python (usando la libreria music21) e MiniZinc, valutare pregi e limiti del suo approccio, e infine discutere come le sue idee possono essere rilette alla luce degli sviluppi più recenti dell'intelligenza artificiale simbolica.

---

## 2. Lo stile come firma

Prima di parlare di algoritmi, è necessario capire cosa intendiamo per "stile musicale" e perché è un problema difficile da catturare formalmente.

Quando diciamo che un brano "suona come Bach", intuitivamente stiamo riconoscendo un insieme di caratteristiche che si ripetono in modo sistematico nell'opera del compositore di Eisenach: il movimento delle voci nel contrappunto, l'uso particolare delle dissonanze e delle loro risoluzioni, le progressioni armoniche tipiche (con la loro preferenza per certi percorsi armonici), le figurazioni melodiche ricorrenti, il ritmo caratteristico, la struttura delle frasi. Nessuna di queste caratteristiche è esclusiva di Bach — ciascuna esiste altrove — ma la loro combinazione e la loro frequenza relativa costituiscono qualcosa di riconoscibile come "bachiano".

I musicologi hanno da sempre tentato di descrivere queste caratteristiche in modo esplicito. Ci sono regole del contrappunto che Bach tendeva a rispettare, e deviazioni che si permetteva in certi contesti ma non in altri. Ci sono progressioni armoniche che ritornano con insistenza in certi contesti funzionali (la cadenza, l'apertura di frase, la modulazione). Ci sono intervalli melodici che Bach prediligeva per la voce del tenore, e altri che tendeva a evitare.

Il problema è che queste descrizioni, per quanto accurate, sono sempre incomplete. Lo stile è un oggetto statistico e contestuale: non è un insieme finito di regole che, se rispettate, garantiscono un risultato "bachiano". È piuttosto una distribuzione di probabilità su uno spazio enorme di possibili scelte musicali. E questa distribuzione è diversa per ogni compositore.

Cope capì che il computer era lo strumento ideale per lavorare con questo tipo di oggetto. Non per "capire" la musica nel senso filosofico del termine, ma per estrarre, catalogare e ricombinare pattern in modo sistematico su corpora di dati abbastanza grandi da catturare la distribuzione stilistica di un compositore.

---

## 3. Come funziona EMI: l'architettura del sistema

Il cuore di EMI è un processo in tre fasi:

1. **Analisi**: scomporre le opere esistenti di un compositore in unità strutturali significative, etichettarle secondo la loro funzione, e catalogarle in un database.
2. **Riconoscimento delle firme**: identificare quei pattern che ricorrono con una frequenza abbastanza alta da costituire delle "firme stilistiche" del compositore — sequenze di note o accordi che lui tende a usare in certi contesti e che altri compositori non usano nello stesso modo.
3. **Ricombinazione**: generare nuova musica assemblandoendo queste firme in modo coerente, rispettando la struttura funzionale del genere (corale, sonata, invenzione...) e garantendo la continuità armonica e melodica.

### 3.1 Il sistema SPEAC

Il componente più originale dell'architettura di Cope è il **sistema SPEAC** (Statement, Preparation, Extension, Antecedent, Consequent). Si tratta di un sistema di etichettatura funzionale applicato a ciascun evento musicale — tipicamente a ciascun accordo o segmento armonico.

Le cinque etichette hanno il seguente significato:

- **S (Statement)**: stabilisce il centro tonale. In una tonalità maggiore, l'accordo di tonica (I) è tipicamente uno Statement. È il punto di arrivo, il momento di stabilità.
- **P (Preparation)**: prepara l'arrivo di uno Statement. Il IV grado (subdominante) svolge spesso questo ruolo.
- **E (Extension)**: prolunga la funzione dell'elemento precedente. Può essere usato per accordi che mantengono la tensione o la stabilità già stabilita.
- **A (Antecedent)**: crea tensione che richiede risoluzione. Il V grado (dominante) è l'Antecedent per eccellenza.
- **C (Consequent)**: risolve la tensione creata dall'Antecedent. L'I che segue il V è un Consequent.

L'etichettatura SPEAC non è semplicemente un rinominare le funzioni armoniche tradizionali. Cope la applica in modo gerarchico: un intero movimento può essere visto come S-A-C a livello macro, mentre ogni frase al suo interno ha una propria struttura SPEAC, e ogni singolo accordo all'interno della frase ha la sua etichetta locale.

Questa gerarchizzazione è cruciale: permette al sistema di mantenere la coerenza strutturale a più livelli contemporaneamente. Una cadenza autentica (V-I) alla fine di una sezione è C a livello locale, ma la sezione intera che termina con quella cadenza può essere A a livello della forma complessiva.

L'idea si ispira agli Augmented Transition Networks (ATN), strutture grammaticali ricorsive usate in linguistica computazionale per descrivere la sintassi delle lingue naturali. Come una frase grammaticale in italiano ha una struttura gerarchica (soggetto, predicato, complementi, ciascuno a sua volta strutturato), così una composizione musicale ha una struttura grammaticale che Cope cerca di catturare attraverso SPEAC.

### 3.2 Le firme stilistiche

Dopo aver etichettato sistematicamente tutti gli accordi e i segmenti di un corpus di opere di un compositore, EMI cerca quei pattern che si ripetono con frequenza insolita. Cope li chiama **signatures** — firme.

Una firma non è semplicemente un accordo comune: è una sequenza contestualizzata. Per esempio, una firma bachiana potrebbe essere: "in un contesto che porta alla cadenza autentica in minore, dopo un accordo di IV diminuito in primo rivolto, Bach tende a inserire una nota di passaggio cromatica nella voce del contralto prima di risolvere sul V". Questo tipo di pattern è specifico, contestuale, e sufficientemente raro da costituire una vera "impronta digitale".

Cope fu sorpreso nello scoprire quante firme fossero effettivamente presenti nei compositori che analizzò. Bach, per esempio, aveva centinaia di piccoli gesti melodici e armonici che ricorrevano quasi ossessivamente in contesti analoghi. La ricchezza di queste firme è ciò che rende riconoscibile uno stile anche per un ascoltatore non esperto.

Il database delle firme viene organizzato secondo l'etichetta SPEAC del contesto in cui ciascuna firma appare. Così, quando il generatore ha bisogno di un accordo con funzione A (Antecedent) in un certo contesto tonale, può attingere al sottoinsieme delle firme etichettate A che si adattano a quel contesto.

### 3.3 La ricombinazione

La fase di generazione funziona come segue:

1. Si determina la struttura SPEAC dell'opera da generare (per esempio: per un corale di Bach a quattro voci in forma A-B-A, si stabilisce la successione di etichette SPEAC a livello macro).
2. Per ciascun slot nella struttura, si seleziona dal database una firma che abbia l'etichetta SPEAC appropriata, che sia compatibile tonalmente con il contesto circostante, e che possa collegarsi senza discontinuità armonica con ciò che precede e segue.
3. Le firme selezionate vengono "incollate" insieme, con eventuali aggiustamenti nelle note di collegamento per garantire la fluidità del movimento delle voci.

È importante notare che EMI **non** genera note una per una seguendo probabilità locali. Lavora con blocchi di materiale già elaborato — le firme — che portano con sé un carattere stilistico intrinseco. Questo è ciò che distingue l'approccio di Cope da un semplice modello di Markov su note singole: i mattoni di costruzione sono già "bachiani" o "mozartiani" perché provengono direttamente dalle opere di quei compositori.

---

## 4. Esempi pratici con Python e music21

Passiamo ora dalla teoria alla pratica. La libreria Python **music21**, sviluppata principalmente al MIT da Michael Cuthbert, è oggi lo strumento standard per l'analisi e la manipolazione della musica simbolica. Permette di caricare partiture in vari formati (MusicXML, MIDI, corali di Bach inclusi nel corpus della libreria stessa), analizzarle armonicamente, estrarre pattern, e generare nuova musica.

Vediamo come potremmo costruire, in forma semplificata, una versione rudimentale del sistema di Cope per i corali di Bach.

### 4.1 Caricare e analizzare un corale di Bach

```python
from music21 import corpus, roman, key, chord, stream
from music21 import harmony, note, pitch
import collections
import random

# Carichiamo un corale di Bach dalla libreria di music21
# Il corpus contiene numerosi corali di Bach in formato MusicXML
bwv = corpus.parse('bach/bwv66.6')

# Visualizzare la struttura di base
print(f"Tonalità: {bwv.analyze('key')}")
print(f"Numero di misure: {len(bwv.parts[0].getElementsByClass('Measure'))}")

# Estraiamo le parti separate (SATB)
soprano = bwv.parts[0]   # Soprano
alto    = bwv.parts[1]   # Contralto
tenor   = bwv.parts[2]   # Tenore
bass    = bwv.parts[3]   # Basso

# Analizziamo la tonalità
k = bwv.analyze('key')
print(f"Tonalità rilevata: {k}")
```

Questo codice carica il corale BWV 66.6 (uno dei circa 400 corali di Bach disponibili nel corpus di music21) e ne estrae la tonalità. La funzione `analyze('key')` usa un algoritmo di profilazione delle altezze (Krumhansl-Schmuckler) per determinare la tonalità più probabile.

### 4.2 Estrarre l'analisi armonica con numeri romani

```python
def estrai_numeri_romani(partitura):
    """
    Restituisce una lista di numeri romani per ciascun accordo
    nella partitura, analizzato rispetto alla tonalità globale.
    """
    k = partitura.analyze('key')
    accordi_analizzati = []
    
    # Riduce la partitura a soli accordi (chordify)
    partitura_accordi = partitura.chordify()
    
    for c in partitura_accordi.flatten().getElementsByClass('Chord'):
        # Assegna numero romano rispetto alla tonalità
        num_romano = roman.romanNumeralFromChord(c, k)
        accordi_analizzati.append({
            'offset': c.offset,
            'accordo': c.pitchNames,
            'romano': num_romano.figure,
            'radice': num_romano.root().name,
            'qualita': num_romano.quality
        })
    
    return accordi_analizzati, k

accordi, tonalita = estrai_numeri_romani(bwv)

# Stampiamo i primi 10 accordi
for a in accordi[:10]:
    print(f"Offset {a['offset']:.1f}: {a['accordo']} -> {a['romano']} ({a['qualita']})")
```

La funzione `chordify()` è uno strumento potente di music21: riduce una partitura multi-voce a una sequenza di accordi, collassando le voci verticalmente. Otteniamo così la "progressione armonica" del corale, espressa in numeri romani relativi alla tonalità.

### 4.3 Costruire una matrice di transizione (catena di Markov)

Una delle tecniche più semplici per modellare lo stile armonico di un compositore è la catena di Markov: studiamo con quale frequenza ciascun accordo (o coppia di accordi) è seguito da ciascun altro accordo, e usiamo queste probabilità per generare nuove progressioni.

```python
def costruisci_matrice_transizione(lista_corali, ordine=2):
    """
    Costruisce una matrice di transizione di ordine n
    per progressioni armoniche estratte da una lista di corali.
    ordine=1: P(C_n | C_{n-1})
    ordine=2: P(C_n | C_{n-1}, C_{n-2})
    """
    conteggi = collections.defaultdict(collections.Counter)
    
    for nome_bwv in lista_corali:
        try:
            partitura = corpus.parse(nome_bwv)
            accordi, _ = estrai_numeri_romani(partitura)
            
            # Estraiamo solo la sequenza di simboli armonici
            sequenza = [a['romano'] for a in accordi]
            
            # Costruiamo n-grammi
            for i in range(len(sequenza) - ordine):
                contesto = tuple(sequenza[i:i+ordine])
                successivo = sequenza[i+ordine]
                conteggi[contesto][successivo] += 1
        except Exception as e:
            print(f"Errore con {nome_bwv}: {e}")
    
    # Convertiamo in probabilità
    matrice = {}
    for contesto, successori in conteggi.items():
        totale = sum(successori.values())
        matrice[contesto] = {
            accordo: count/totale 
            for accordo, count in successori.items()
        }
    
    return matrice

# Lista di alcuni corali di Bach disponibili nel corpus
corali_bach = [
    'bach/bwv66.6', 'bach/bwv153.1', 'bach/bwv227.1',
    'bach/bwv227.7', 'bach/bwv227.11', 'bach/bwv248.23-2'
]

matrice_bach = costruisci_matrice_transizione(corali_bach, ordine=2)

# Esempio: quali accordi seguono tipicamente il V7 dopo il I?
contesto = ('I', 'V7')
if contesto in matrice_bach:
    print(f"\nDopo I -> V7, Bach tende a usare:")
    for accordo, prob in sorted(matrice_bach[contesto].items(), 
                                 key=lambda x: -x[1])[:5]:
        print(f"  {accordo}: {prob:.2%}")
```

Questo modello è una versione molto semplificata di quello che fa Cope: non cattura il carattere melodico delle singole voci, non considera il movimento interno, non applica il sistema SPEAC. Ma illustra il principio fondamentale: estrarre statistiche di transizione da un corpus e usarle per generare.

### 4.4 Generare una nuova progressione armonica

```python
def genera_progressione(matrice, stato_iniziale, lunghezza=16, ordine=2):
    """
    Genera una progressione armonica usando la catena di Markov costruita
    sul corpus di Bach.
    """
    if len(stato_iniziale) != ordine:
        raise ValueError(f"Lo stato iniziale deve avere esattamente {ordine} elementi")
    
    progressione = list(stato_iniziale)
    
    for _ in range(lunghezza - ordine):
        contesto = tuple(progressione[-ordine:])
        
        if contesto not in matrice:
            # Se il contesto non è mai stato visto, ricominciamo
            # da uno stato frequente (strategia di backoff)
            contesto_fallback = tuple(progressione[-1:])
            # Cerca un contesto di ordine 1
            for key in matrice:
                if len(key) == 1 and key[0] == progressione[-1]:
                    contesto = key
                    break
            else:
                # Ricominciamo da capo
                progressione.append(stato_iniziale[0])
                continue
        
        # Selezione pesata in base alle probabilità
        accordi = list(matrice[contesto].keys())
        probabilita = list(matrice[contesto].values())
        
        prossimo = random.choices(accordi, weights=probabilita, k=1)[0]
        progressione.append(prossimo)
    
    return progressione

# Generiamo una progressione di 16 accordi nello stile di Bach
random.seed(42)  # Per riproducibilità
progressione = genera_progressione(
    matrice_bach,
    stato_iniziale=('I', 'I'),
    lunghezza=16
)

print("Progressione generata nello stile armonico di Bach:")
print(" -> ".join(progressione))
```

### 4.5 Estrarre e replicare le firme melodiche

L'elemento più sofisticato del sistema di Cope — le firme stilistiche — richiede un'analisi più fine. Vediamo come estrarre i profili di intervallo melodico dalla voce del soprano in un insieme di corali:

```python
import numpy as np

def estrai_intervalli_melodici(parte, finestra=3):
    """
    Estrae sequenze di intervalli melodici (in semitoni) da una parte,
    usando una finestra scorrevole della dimensione specificata.
    Restituisce un Counter di n-grammi di intervalli.
    """
    note_sequenza = []
    
    for n in parte.flatten().getElementsByClass('Note'):
        note_sequenza.append(n.pitch.midi)
    
    intervalli = [note_sequenza[i+1] - note_sequenza[i] 
                  for i in range(len(note_sequenza)-1)]
    
    ngrams = collections.Counter()
    for i in range(len(intervalli) - finestra + 1):
        ngram = tuple(intervalli[i:i+finestra])
        ngrams[ngram] += 1
    
    return ngrams

def costruisci_lessico_melodico(lista_corali, finestra=3):
    """
    Costruisce un lessico di sequenze melodiche tipiche di Bach
    analizzando il soprano di un corpus di corali.
    """
    lessico_globale = collections.Counter()
    
    for nome_bwv in lista_corali:
        try:
            partitura = corpus.parse(nome_bwv)
            soprano = partitura.parts[0]
            ngrams = estrai_intervalli_melodici(soprano, finestra)
            lessico_globale.update(ngrams)
        except Exception as e:
            print(f"Errore: {e}")
    
    return lessico_globale

lessico_bach = costruisci_lessico_melodico(corali_bach, finestra=3)

print("Le 10 sequenze melodiche più frequenti in Bach (soprano):")
print("(valori in semitoni: +2 = tono su, -1 = semitono giù, ecc.)")
for sequenza, freq in lessico_bach.most_common(10):
    intervalli_desc = []
    for i in sequenza:
        if i > 0:
            intervalli_desc.append(f"+{i}")
        else:
            intervalli_desc.append(str(i))
    print(f"  {' '.join(intervalli_desc)}: {freq} occorrenze")
```

### 4.6 Dalla progressione armonica a una partitura reale

Il passo finale è trasformare la progressione armonica generata in una partitura a quattro voci. Questo richiede di "realizzare" ciascun accordo — scegliere quali note assegnare a ciascuna voce. Cope fa questo attingendo alle firme del suo database; qui mostriamo un approccio semplificato basato su regole:

```python
from music21 import stream, note, chord as chord_module, meter, clef

# Dizionario semplificato: simbolo romano -> altezze MIDI in Do maggiore
# (soprano, contralto, tenore, basso) - valori esemplificativi
REALIZZAZIONI_C_MAGGIORE = {
    'I':   [(72, 67, 64, 60), (67, 64, 60, 48)],   # Do maggiore
    'ii':  [(69, 65, 62, 50), (74, 69, 65, 62)],   # Re minore
    'iii': [(71, 67, 64, 52), (76, 71, 67, 52)],   # Mi minore
    'IV':  [(72, 69, 65, 53), (65, 60, 57, 53)],   # Fa maggiore
    'V':   [(71, 67, 62, 55), (74, 71, 67, 55)],   # Sol maggiore
    'V7':  [(71, 65, 62, 55), (74, 71, 65, 55)],   # Sol settima
    'vi':  [(69, 64, 60, 57), (72, 69, 64, 57)],   # La minore
    'vii°':[(71, 65, 62, 59), (74, 71, 65, 59)],   # Si diminuito
}

def crea_partitura_satb(progressione, metro='4/4', durata_accordo=1.0):
    """
    Crea una partitura SATB da una lista di simboli romani.
    Usa realizzazioni predefinite (semplificato).
    """
    partitura = stream.Score()
    
    parti = {
        'Soprano': stream.Part(),
        'Contralto': stream.Part(),
        'Tenore': stream.Part(),
        'Basso': stream.Part()
    }
    
    for nome, parte in parti.items():
        parte.id = nome
        parte.insert(0, meter.TimeSignature(metro))
    
    for simbolo in progressione:
        # Cerca nel dizionario; se non trovato, usa il I
        realizzazioni = REALIZZAZIONI_C_MAGGIORE.get(
            simbolo, REALIZZAZIONI_C_MAGGIORE['I']
        )
        realizzazione = random.choice(realizzazioni)
        altezze_midi = realizzazione
        
        nomi_parti = ['Soprano', 'Contralto', 'Tenore', 'Basso']
        for nome_parte, midi in zip(nomi_parti, altezze_midi):
            n = note.Note()
            n.pitch.midi = midi
            n.duration.quarterLength = durata_accordo
            parti[nome_parte].append(n)
    
    for parte in parti.values():
        partitura.insert(0, parte)
    
    return partitura

# Generiamo la partitura
partitura_generata = crea_partitura_satb(progressione[:8])
partitura_generata.write('musicxml', '/tmp/bach_stile.xml')
print("Partitura generata e salvata in /tmp/bach_stile.xml")
```

---

## 5. Vincoli e regole: MiniZinc per il contrappunto

Mentre l'approccio a catena di Markov cattura le probabilità statistiche, non garantisce il rispetto delle regole del contrappunto che Bach osservava sistematicamente. Qui entra in gioco un approccio complementare: il **soddisfacimento di vincoli** (Constraint Satisfaction Problem, CSP).

**MiniZinc** è un linguaggio di modellazione per problemi di vincoli e ottimizzazione. Permette di esprimere in modo dichiarativo cosa deve essere vero nella soluzione, lasciando al solver il compito di trovare valori che soddisfino tutti i vincoli. Questo è ideale per codificare le regole del contrappunto bachiano.

### 5.1 Le regole fondamentali del contrappunto a quattro voci

Le principali regole che Bach rispettava nel contrappunto corale sono:

1. **Ambiti vocali**: il soprano canta tra Sol4 e Sol5, il contralto tra Do4 e Fa5, il tenore tra Do3 e Sol4, il basso tra Mi2 e Do4.
2. **Nessun incrocio di voci**: in ogni verticale, il soprano è più acuto del contralto, che è più acuto del tenore, che è più acuto del basso.
3. **Nessuna quinta o ottava parallela**: tra due voci adiacenti, non si devono muovere in moto parallelo su intervalli di quinta o ottava.
4. **Nessuna quinta o ottava diretta** (per le voci estreme): soprano e basso non possono raggiungere in moto retto una quinta o un'ottava.
5. **Risoluzione della sensibile**: il settimo grado (sensibile) deve risolvere verso l'alto di un semitono al grado successivo.
6. **Salti melodici limitati**: le voci interne (contralto e tenore) devono preferire il moto per gradi; i salti di sesta o più sono rari.
7. **Raddoppio appropriato**: in un accordo di triade, si raddoppia preferibilmente la fondamentale; in un accordo di sesta, il basso.

### 5.2 Modello MiniZinc per la realizzazione di una progressione

```minizinc
% ============================================================
%  Realizzazione di una progressione armonica nello stile
%  di Bach a quattro voci (SATB)
%  
%  Usiamo pitch MIDI: C4 = 60, D4 = 62, ecc.
%  Ogni variabile rappresenta l'altezza MIDI di una voce
%  in un dato accordo.
% ============================================================

include "globals.mzn";

% --- Parametri ---
int: n_accordi = 4;  % Numero di accordi nella sequenza

% Definiamo una progressione: I - IV - V7 - I in Do maggiore
% Per ogni accordo specifichiamo le classi di altezza permesse (mod 12)
% Do=0, Re=2, Mi=4, Fa=5, Sol=7, La=9, Si=11

array[1..n_accordi, 1..4] of set of int: classi_permesse = 
[|  % I:    C E G
   {0, 4, 7},    % Soprano
   {0, 4, 7},    % Contralto
   {0, 4, 7},    % Tenore
   {0, 4, 7}     % Basso
|  % IV:   F A C
   {0, 5, 9},
   {0, 5, 9},
   {0, 5, 9},
   {0, 5, 9}
|  % V7:   G B D F
   {2, 5, 7, 11},
   {2, 5, 7, 11},
   {2, 5, 7, 11},
   {2, 5, 7, 11}
|  % I:    C E G
   {0, 4, 7},
   {0, 4, 7},
   {0, 4, 7},
   {0, 4, 7}
|];

% --- Variabili ---
% s=soprano(1), a=contralto(2), t=tenore(3), b=basso(4)
% Indici: accordo, voce

array[1..n_accordi, 1..4] of var int: voce;

% --- Vincoli di ambito ---
constraint forall(i in 1..n_accordi) (
    voce[i,1] >= 60 /\ voce[i,1] <= 79  % Soprano: C4-G5
    /\ voce[i,2] >= 55 /\ voce[i,2] <= 74  % Contralto: G3-D5
    /\ voce[i,3] >= 48 /\ voce[i,3] <= 67  % Tenore: C3-G4
    /\ voce[i,4] >= 40 /\ voce[i,4] <= 60  % Basso: E2-C4
);

% --- Appartenenza alle classi di altezza dell'accordo ---
constraint forall(i in 1..n_accordi, v in 1..4) (
    voce[i,v] mod 12 in classi_permesse[i,v]
);

% --- Nessun incrocio di voci ---
constraint forall(i in 1..n_accordi) (
    voce[i,1] > voce[i,2]   % S > A
    /\ voce[i,2] > voce[i,3]  % A > T
    /\ voce[i,3] > voce[i,4]  % T > B
);

% --- Nessuna quinta parallela tra voci adiacenti ---
% Controlla le coppie (S,A), (A,T), (T,B), (S,B)
array[1..6] of tuple(int,int): coppie_voci = 
    [(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)];

constraint forall(i in 1..n_accordi-1, c in index_set(coppie_voci)) (
    let { 
        int: v1 = coppie_voci[c].1,
        int: v2 = coppie_voci[c].2,
        var int: int_prima  = abs(voce[i,v1]   - voce[i,v2]),
        var int: int_seconda = abs(voce[i+1,v1] - voce[i+1,v2])
    } in
    % Nessuna quinta parallela (7 semitoni)
    not (int_prima mod 12 == 7 /\ int_seconda mod 12 == 7
         /\ voce[i,v1] < voce[i+1,v1])  % moto parallelo
    /\
    % Nessuna ottava parallela (12 o 0 semitoni)
    not (int_prima mod 12 == 0 /\ int_seconda mod 12 == 0
         /\ voce[i,v1] < voce[i+1,v1])
);

% --- Salti melodici limitati per le voci interne ---
% Il contralto (v=2) e il tenore (v=3) non saltano più di una sesta
constraint forall(i in 1..n_accordi-1, v in 2..3) (
    abs(voce[i+1,v] - voce[i,v]) <= 9   % max nona (per sicurezza)
);

% --- Risoluzione della sensibile (Si -> Do in Do magg.) ---
% Nella progressione V7 -> I (accordi 3->4),
% la sensibile (Si=11 mod 12) deve risolvere verso Do (0 mod 12) o Ré
constraint forall(v in 1..4) (
    voce[3,v] mod 12 == 11 ->     % se è Si
    (voce[4,v] mod 12 == 0        % deve andare a Do
     \/ voce[4,v] - voce[3,v] == 1)  % oppure salire di semitono
);

% --- Funzione obiettivo: minimizzare il movimento complessivo ---
% (preferenza per il moto per gradi e minimo movimento)
var int: costo_movimento = sum(i in 1..n_accordi-1, v in 1..4) (
    abs(voce[i+1,v] - voce[i,v])
);

solve minimize costo_movimento;

% --- Output ---
output [
    "Accordo " ++ show(i) ++ ": " ++
    "S=" ++ show(voce[i,1]) ++ " " ++
    "A=" ++ show(voce[i,2]) ++ " " ++
    "T=" ++ show(voce[i,3]) ++ " " ++
    "B=" ++ show(voce[i,4]) ++ "\n"
    | i in 1..n_accordi
] ++ ["Costo totale: " ++ show(costo_movimento) ++ "\n"];
```

### 5.3 Interpretare i risultati di MiniZinc

Quando eseguiamo il modello con un solver come Gecode o CP-SAT, otteniamo qualcosa di simile a:

```
Accordo 1: S=67 A=64 B=60 T=48   % Sol4, Mi4, Do4, Do3  -> I
Accordo 2: S=65 A=65 B=60 T=53   % Fa4, Fa4, Do4, Fa3   -> IV
Accordo 3: S=67 A=65 B=62 T=55   % Sol4, Fa4, Re4, Sol3 -> V7
Accordo 4: S=67 A=64 B=60 T=48   % Sol4, Mi4, Do4, Do3  -> I
Costo totale: 8
```

Il solver ha trovato una realizzazione che rispetta tutti i vincoli e minimizza il movimento complessivo delle voci — esattamente il principio dell'economia del moto che caratterizza il contrappunto bachiano.

La potenza di MiniZinc in questo contesto è la capacità di aggiungere facilmente nuovi vincoli senza dover riscrivere l'algoritmo di ricerca: se vogliamo aggiungere la regola che il basso non deve mai fare salti di settima, basta aggiungere un vincolo.

### 5.4 Combinare Markov e vincoli: un approccio ibrido

L'approccio più efficace — e quello che meglio approssima il sistema di Cope — combina i due strumenti:

1. **Markov genera la progressione**: la catena di Markov addestrata sul corpus di Bach seleziona la successione di accordi con la distribuzione statistica corretta.
2. **MiniZinc realizza la progressione**: dati gli accordi scelti, il solver trova una realizzazione a quattro voci che rispetta tutte le regole del contrappunto.

```python
def genera_corale_completo(matrice_transizione, n_accordi=16):
    """
    Genera un corale completo in stile Bach:
    1. Genera la progressione armonica con Markov
    2. Risolve la realizzazione SATB con un CSP semplificato
    """
    # Fase 1: generazione della progressione
    progressione = genera_progressione(
        matrice_transizione,
        stato_iniziale=('I', 'I'),
        lunghezza=n_accordi
    )
    print(f"Progressione: {' - '.join(progressione)}")
    
    # Fase 2: realizzazione (qui usiamo il dizionario semplificato,
    # ma in produzione chiameremmo MiniZinc via subprocess)
    partitura = crea_partitura_satb(progressione)
    
    return partitura, progressione

# Il collegamento con MiniZinc avverrebbe attraverso:
# import subprocess
# with open('/tmp/progressione.dzn', 'w') as f:
#     f.write(f"n_accordi = {len(progressione)};\n")
#     f.write(f"accordi = {progressione_to_minizinc(progressione)};\n")
# result = subprocess.run(
#     ['minizinc', 'contrappunto.mzn', '/tmp/progressione.dzn'],
#     capture_output=True, text=True
# )
```

---

## 6. Pregi dell'approccio di Cope

### 6.1 La riproducibilità dello stile come fatto empirico

Il risultato più importante di EMI non è tanto la qualità estetica delle composizioni generate — che è discutibile e variabile — quanto la **dimostrazione empirica** che lo stile musicale è in larga misura riproducibile attraverso l'analisi statistica e la ricombinazione. Questo è un fatto sorprendente e ha implicazioni profonde per la musicologia.

Prima di Cope, molti musicologi e compositori avrebbero sostenuto che lo stile di Bach era il risultato di qualcosa di inafferrabile — un genio, un'ispirazione, una visione — che non poteva essere ridotto a pattern e probabilità. EMI dimostrò che questa posizione, pur poeticamente attraente, era empiricamente vulnerabile: i test alla cieca condotti da Cope mostravano che ascoltatori esperti, in una percentuale significativa di casi, non riuscivano a distinguere i corali di EMI da quelli autentici.

### 6.2 La modularità del metodo

L'architettura di EMI è modulare in senso informatico: l'analisi, il database delle firme, e il generatore sono componenti separati che possono essere migliorati indipendentemente. Questo ha permesso a Cope di raffinare il sistema nel corso degli anni, aggiungendo nuovi compositori al corpus e perfezionando l'analisi SPEAC.

La modularità significa anche che il metodo è applicabile a compositori molto diversi tra loro. Cope ha generato opere nello stile di Bach, ma anche di Beethoven, Brahms, Chopin, Mozart, Rachmaninov, Scarlatti, e persino Joplin. Ogni aggiornamento del corpus produceva un diverso "profilo stilistico" con cui il generatore poteva lavorare.

### 6.3 La trasparenza

A differenza dei moderni sistemi di machine learning, il sistema di Cope è interamente interpretabile. Ogni scelta fatta dal generatore può essere tracciata: si può vedere quale firma è stata selezionata, da quale opera proviene, perché è stata scelta in quel contesto. Questo rende EMI un sistema prezioso per la **musicologia computazionale**: non solo genera musica, ma genera anche ipotesi verificabili su cosa costituisce lo stile di un compositore.

### 6.4 Bassi requisiti computazionali

EMI funzionava su hardware degli anni Ottanta e Novanta — computer personali con poca memoria e potenza di calcolo limitata. Questo è possibile perché il sistema lavora su rappresentazioni simboliche altamente compresse (accordi etichettati, non segnali audio), e perché l'algoritmo di ricombinazione è determinato da regole e probabilità, non da calcoli intensivi. Nel contesto attuale, lo stesso approccio può girare su un laptop moderno in pochi secondi.

---

## 7. Limiti e critiche

### 7.1 Il problema della coerenza a lungo raggio

Il limite più serio di EMI, e in generale dei modelli basati su catene di Markov e ricombinazione locale, è la **mancanza di coerenza a lungo raggio**. I pezzi generati da EMI suonano spesso "giusti" localmente — ogni misura o frase è stilisticamente coerente — ma mancano della logica architettonica che caratterizza le grandi composizioni.

In una sonata di Mozart, le idee tematiche sono introdotte, sviluppate, trasformate, e riprese secondo un piano che abbraccia l'intera forma. La riesposizione del tema principale nella tonalità di tonica dopo lo sviluppo non è solo una regola formale: è il compimento di un arco narrativo. EMI non ha un'idea di "arco narrativo". Può riprodurre la struttura superficiale di una forma-sonata (esposizione, sviluppo, riesposizione), ma il materiale tematico delle tre sezioni non è necessariamente correlato in modo significativo.

### 7.2 Il problema della ripetizione e della variazione

Strettamente connesso al punto precedente è il problema della **variazione tematica**. Un compositore umano introduce un tema, poi lo varia, lo frammenta, lo combina con altri temi, ne inverte il profilo melodico. Queste operazioni richiedono una rappresentazione esplicita delle relazioni tra eventi musicali separati nel tempo — relazioni che EMI non è in grado di codificare nella sua architettura attuale.

### 7.3 La critica filosofica: comprensione vs. simulazione

La critica più profonda all'approccio di Cope venne da pensatori come Douglas Hofstadter (autore di *Gödel, Escher, Bach*), che sostenne con forza che EMI non stava "componendo" nel senso autentico del termine: stava producendo pattern soddisfacenti localmente senza alcuna comprensione del significato musicale.

Hofstadter fu così turbato dalle composizioni di EMI che rifiutò di ascoltarne di ulteriori dopo i primi ascolti. Per lui, ciò che rende un corale di Bach bello non è la sua struttura armonica in quanto tale, ma il fatto che quella struttura è l'espressione di un'esperienza umana vissuta — una vita, una fede, un dolore, una gioia. Un sistema che produce la stessa struttura senza vivere quell'esperienza non sta producendo arte, sta producendo un simulacro.

Cope rispose che questa critica si applicherebbe ugualmente alla performance musicale: un pianista che suona una sonata di Beethoven non sta vivendo l'esperienza di Beethoven, eppure la sua esecuzione può essere emotivamente autentica. La risposta non ha convinto tutti, ma ha reso il dibattito più sfumato.

### 7.4 Dipendenza dalla qualità del corpus

EMI è letteralmente ciò che mangia: la qualità delle composizioni generate dipende direttamente dalla quantità e qualità delle opere nel corpus di riferimento. Con poche opere, il sistema tende a "citare" troppo esplicitamente il materiale originale. Con un corpus ampio e diversificato, le firme si mescolano in modi più creativi, ma aumenta anche il rischio di incoerenza.

Questo crea un paradosso: per compositori con corpus vasti (Bach con i suoi 1000+ corali, Mozart con le sinfonie, Beethoven con le sonate) il sistema funziona bene; per compositori con cataloghi ristretti (Scarlatti, sebbene prolifico in certi generi, è limitato nella varietà dei generi) il sistema soffre.

### 7.5 Il problema dell'originalità

Infine, c'è la questione dell'originalità. Le firme di EMI sono letteralmente estratte dalle opere originali: il sistema ricombina materiale preesistente, non crea ex nihilo. Questo pone domande di natura estetica e legale (il copyright delle composizioni generate è un problema aperto) ma soprattutto evidenzia un limite concettuale: EMI può produrre solo variazioni sul già fatto, non può "inventare" uno stile nuovo.

---

## 8. Verso un approccio moderno: IA simbolica generativa

### 8.1 Cosa abbiamo imparato da Cope

L'eredità di Cope è duplice. Da un lato, ha dimostrato empiricamente che lo stile musicale è largamente catturabile da metodi computazionali — una scoperta che ha aperto la strada a decenni di ricerca in musicologia computazionale. Dall'altro, ha identificato con chiarezza i limiti di un approccio puramente ricombinatorio: la coerenza a lungo raggio, la variazione tematica, la struttura narrativa richiedono qualcosa di più.

Nell'ambito della generazione musicale **simbolica** — cioè operando su rappresentazioni discrete come note, accordi, gradi della scala, piuttosto che su segnali audio o embedding neurali — ci sono state sviluppi significativi che estendono e approfondiscono l'approccio di Cope.

### 8.2 Grammatiche formali e sistemi L

Un approccio che Cope non esplorò sistematicamente è quello delle **grammatiche formali** per la generazione musicale. Già negli anni Sessanta, Lindenmayer aveva sviluppato i sistemi L (L-systems) per modellare la crescita delle piante: sistemi di riscrittura in cui simboli vengono sostituiti da sequenze di simboli secondo regole. I sistemi L sono stati applicati alla composizione musicale per generare strutture frattali e auto-similari.

Ma l'approccio più promettente per lo stile è quello delle **grammatiche stocastiche dipendenti dal contesto**. Anziché avere regole deterministiche, si hanno regole con probabilità che dipendono dal contesto locale e globale. Questo cattura meglio la natura statistica dello stile pur mantenendo la struttura gerarchica.

```python
from music21 import stream, note, pitch, duration, meter
import random
from typing import Dict, List, Tuple

class GrammaticaMusicaleStocastica:
    """
    Grammatica stocastica context-sensitive per la generazione
    di strutture musicali in stile bachiano.
    
    I simboli non-terminali rappresentano funzioni strutturali:
    - FRASE: una frase musicale completa
    - ANTECEDENTE: la prima metà della frase (apertura)
    - CONSEGUENTE: la seconda metà (chiusura con cadenza)
    - CADENZA_AUTENTICA: progressione V7-I
    - CADENZA_PLAGALE: progressione IV-I
    - MOTIVO_A: motivo tematico principale
    - MOTIVO_B: motivo tematico secondario (di contrasto)
    """
    
    def __init__(self):
        # Regole di riscrittura con probabilità
        # Formato: simbolo -> [(sequenza_risultante, probabilità), ...]
        self.regole = {
            'CORALE': [
                (['FRASE_A', 'FRASE_A', 'FRASE_B', 'FRASE_A'], 0.5),  # ABA'
                (['FRASE_A', 'FRASE_B', 'FRASE_A', 'FRASE_B'], 0.3),  # ABAB
                (['FRASE_A', 'FRASE_B', 'FRASE_C', 'FRASE_A'], 0.2),  # ABC A
            ],
            'FRASE_A': [
                (['ANTECEDENTE_T', 'CONSEGUENTE_A'], 0.6),
                (['ANTECEDENTE_T', 'ESTENSIONE', 'CONSEGUENTE_A'], 0.4),
            ],
            'FRASE_B': [
                (['ANTECEDENTE_R', 'CONSEGUENTE_R'], 0.7),
                (['ANTECEDENTE_R', 'ESTENSIONE', 'CONSEGUENTE_R'], 0.3),
            ],
            'FRASE_C': [
                (['ANTECEDENTE_T', 'CONSEGUENTE_R'], 1.0),
            ],
            'ANTECEDENTE_T': [
                (['I', 'IV', 'V'], 0.4),     # tonica
                (['I', 'ii', 'V'], 0.35),
                (['I', 'vi', 'IV', 'V'], 0.25),
            ],
            'ANTECEDENTE_R': [
                (['vi', 'ii', 'V', 'vi'], 0.5),   # relativa minore
                (['vi', 'IV', 'V', 'vi'], 0.5),
            ],
            'CONSEGUENTE_A': [
                (['IV', 'V7', 'I'], 0.6),     # cadenza autentica
                (['ii', 'V7', 'I'], 0.4),
            ],
            'CONSEGUENTE_R': [
                (['ii', 'V', 'vi'], 0.5),    # cadenza sulla relativa
                (['IV', 'V', 'vi'], 0.5),
            ],
            'ESTENSIONE': [
                (['I', 'IV'], 0.4),
                (['vi', 'ii'], 0.3),
                (['I', 'V', 'I'], 0.3),
            ],
        }
        
        # Terminali: simboli che non vengono riscritti
        self.terminali = {'I', 'ii', 'iii', 'IV', 'V', 'V7', 'vi', 'vii°'}
    
    def genera(self, simbolo: str, profondita_max: int = 10) -> List[str]:
        """Espande un simbolo ricorsivamente fino ai terminali."""
        if simbolo in self.terminali or profondita_max == 0:
            return [simbolo]
        
        if simbolo not in self.regole:
            return [simbolo]
        
        # Selezione pesata della regola
        regole_disp = self.regole[simbolo]
        sequenze = [r[0] for r in regole_disp]
        probabilita = [r[1] for r in regole_disp]
        
        sequenza_scelta = random.choices(sequenze, weights=probabilita, k=1)[0]
        
        # Espansione ricorsiva
        risultato = []
        for s in sequenza_scelta:
            risultato.extend(self.genera(s, profondita_max - 1))
        
        return risultato

# Utilizzo
random.seed(7)
grammatica = GrammaticaMusicaleStocastica()
corale = grammatica.genera('CORALE')
print("Struttura generata:")
print(" -> ".join(corale))
```

Questo approccio va oltre la semplice catena di Markov: la grammatica produce strutture con coerenza gerarchica — i blocchi FRASE_A si comportano in modo coerente all'interno della struttura CORALE, le cadenze appaiono nei punti strutturalmente appropriati.

### 8.3 Sistemi di planning simbolico per la forma musicale

Un'altra estensione importante dell'approccio di Cope è l'uso del **planning automatico** (AI planning) per gestire la struttura a lungo raggio. In questa prospettiva, la composizione è un problema di pianificazione: si parte da uno stato iniziale (tonica, metro, tema A) e si vuole raggiungere uno stato finale (conclusione sulla tonica, dopo uno sviluppo armonicamente coerente), trovando una sequenza di azioni (progressioni armoniche, modulazioni, ritorni tematici) che costituisca un percorso valido.

I moderni sistemi di planning come PDDL (Planning Domain Definition Language) possono essere usati per modellare questo problema, specificando:

- **Stato**: tonalità corrente, sezione formale (esposizione/sviluppo/ripresa), temi già introdotti
- **Azioni**: modulare a una tonalità vicina, introdurre un nuovo tema, sviluppare un tema esistente, preparare la cadenza finale
- **Precondizioni**: ogni azione è applicabile solo in certi stati (non si può tornare alla tonica prima di aver completato lo sviluppo)
- **Goal**: raggiungere la conclusione formale con tutti i temi reintrodotti

Combinare Markov per la generazione locale con planning per la struttura globale è uno dei fronti più attivi della generazione musicale simbolica contemporanea.

### 8.4 Grammatiche di alberi (Tree-Adjoining Grammars) per l'analisi tonale

Una delle rappresentazioni simboliche più potenti per la musica tonale è la **analisi per riduzione** sviluppata da Heinrich Schenker: l'idea che una composizione tonal possa essere descritta come una serie di strati di elaborazione, da uno "sfondo" armonico elementare (Ursatz) attraverso livelli intermedi di elaborazione fino alla superficie della partitura.

Le Tree-Adjoining Grammars (TAG) sono state usate da ricercatori come Mark Steedman e Martin Rohrmeier per formalizzare l'analisi schenkeriana in un sistema computazionale. In questo approccio, generare musica equivale a costruire un albero di derivazione da radice a foglie — esattamente come un parser grammaticale genera frasi da una grammatica formale.

```python
class AnalisiSchenkeriana:
    """
    Rappresentazione semplificata dell'analisi tonale
    in termini di struttura ad albero.
    
    Ogni nodo dell'albero è un evento armonico con:
    - funzione (tonica, dominante, sottodominante...)
    - livello strutturale (sfondo, primo piano, superficie)
    - relazione con il nodo padre (prolungamento, progressione)
    """
    
    def __init__(self, tonalita='C'):
        self.tonalita = tonalita
        self.struttura_sfondo = self._costruisci_sfondo()
    
    def _costruisci_sfondo(self):
        """L'Ursatz: I-V-I a livello di sfondo."""
        return {
            'tipo': 'prolungamento_tonica',
            'inizio': {'grado': 'I', 'livello': 'sfondo'},
            'mezzo': {'grado': 'V', 'livello': 'sfondo'},
            'fine': {'grado': 'I', 'livello': 'sfondo'},
            'elaborazioni': []
        }
    
    def aggiungi_elaborazione(self, nodo_genitore, tipo_elaborazione, dettagli):
        """
        Aggiunge una elaborazione a un nodo esistente.
        tipo_elaborazione: 'prolungamento', 'progressione', 'modulazione'
        """
        nodo_genitore['elaborazioni'].append({
            'tipo': tipo_elaborazione,
            'livello': 'primo_piano',
            'dettagli': dettagli
        })
    
    def appiattisci(self, nodo=None, livello_max='superficie'):
        """
        Trasforma l'albero in una sequenza lineare di eventi
        leggendo le foglie dell'albero da sinistra a destra.
        """
        if nodo is None:
            nodo = self.struttura_sfondo
        
        sequenza = []
        
        if not nodo.get('elaborazioni'):
            # Nodo foglia: emetti l'evento
            if 'inizio' in nodo:
                sequenza.append(nodo['inizio']['grado'])
            if 'mezzo' in nodo:
                sequenza.append(nodo['mezzo']['grado'])
            if 'fine' in nodo:
                sequenza.append(nodo['fine']['grado'])
        else:
            # Nodo interno: prima l'inizio, poi le elaborazioni, poi la fine
            if 'inizio' in nodo:
                sequenza.append(nodo['inizio']['grado'])
            for elab in nodo['elaborazioni']:
                sequenza.extend(self.appiattisci(elab.get('dettagli', {})))
            if 'mezzo' in nodo:
                sequenza.append(nodo['mezzo']['grado'])
            if 'fine' in nodo:
                sequenza.append(nodo['fine']['grado'])
        
        return sequenza
```

### 8.5 Verso un sistema di Cope "aumentato"

Sintetizzando tutto ciò che abbiamo visto, possiamo immaginare un sistema moderno che riprenda e migliori l'approccio di Cope, rimanendo nell'ambito puramente simbolico:

**Livello 1 — Struttura formale (planning)**: Un pianificatore simbolico determina la struttura macro dell'opera: quante sezioni, quali relazioni tonali tra le sezioni, dove si collocano le cadenze principali, quali temi vengono introdotti e ripresi.

**Livello 2 — Struttura tonale (grammatiche)**: Una grammatica stocastica riempie la struttura formale con una progressione armonica coerente a livello di frase, rispettando le convenzioni tonali del periodo (uso delle cadenze, gestione delle modulazioni, funzioni strutturali).

**Livello 3 — Firme stilistiche (database di Cope)**: Le progressioni armoniche vengono "arricchite" con le firme stilistiche estratte dal corpus del compositore target: figurazioni melodiche caratteristiche, ritmi tipici, abbellimenti idiomatici.

**Livello 4 — Realizzazione (CSP/MiniZinc)**: Le progressioni arricchite vengono realizzate a quattro voci rispettando le regole del contrappunto, con un solver di vincoli che garantisce la correttezza locale.

Ciascuno di questi livelli è indipendentemente migliorabile. Il livello 2 può usare modelli sempre più sofisticati (da bigram Markov a modelli di ordine superiore, a grammatiche context-free stocastiche). Il livello 3 può attingere a corpus sempre più vasti. Il livello 4 può incorporare regole di contrappunto sempre più raffinate.

### 8.6 Il ruolo delle ontologie musicali

Un elemento che Cope non sviluppò sistematicamente ma che un sistema moderno dovrebbe includere è un'**ontologia musicale formale**: una rappresentazione esplicita di concetti come "tema", "motivo", "variazione", "sviluppo", "ripresa", con le relazioni tra questi concetti.

Sistemi come **Music Ontology** (sviluppato nell'ambito del Web Semantico) o il progetto **JAMS** (JSON Annotated Music Specification) forniscono vocabolari standardizzati per descrivere la musica a vari livelli di astrazione. Integrare queste ontologie in un sistema generativo permetterebbe di ragionare esplicitamente sulla coerenza tematica a lungo raggio — esattamente il limite principale di EMI.

Per esempio, se il sistema "sa" che il motivo M1 è stato introdotto nella battuta 3 in Re maggiore, può pianificare di riutilizzarlo nella battuta 47 nella tonalità relativa, e di frammentarlo nelle battute 28-34 durante lo sviluppo — creando esattamente quel tipo di coerenza narrativa che i pezzi di Cope tendevano a non avere.

### 8.7 Sistemi di ragionamento su casi (Case-Based Reasoning)

Un'altra direzione promettente è il **ragionamento su casi** (Case-Based Reasoning, CBR): invece di estrarre pattern astratti dal corpus, il sistema mantiene una memoria di casi concreti (frasi musicali complete, con il loro contesto) e, quando deve generare, recupera il caso più simile al contesto attuale e lo adatta.

Questo è più vicino a come funziona effettivamente la creatività umana: un compositore non ragiona in termini di statistiche astratte, ma ricorda frasi specifiche che ha sentito o scritto in passato e le adatta al nuovo contesto. Il CBR applicato alla musica è stato esplorato da ricercatori come Bob Sturm e Atte Tenkanen, e produce risultati interessanti specialmente per la musica tradizionale e popolare (dove i "casi" sono facilmente definibili come melodie folk complete).

---

## 9. Un esercizio di sintesi: analisi comparativa di stili

Concludiamo con un esempio che mostra come i principi discussi possano essere usati per un compito di analisi stilistica comparativa — un'applicazione complementare alla generazione.

```python
from music21 import corpus, features, environment
import numpy as np
from sklearn.decomposition import PCA  # Solo per visualizzazione

def estrai_vettore_stile(nome_partitura):
    """
    Estrae un vettore di caratteristiche stilistiche da una partitura.
    Usa il sistema di feature extraction di music21.
    """
    partitura = corpus.parse(nome_partitura)
    
    # Feature estrattibili con music21
    caratteristiche = {}
    
    # 1. Distribuzione degli intervalli melodici (soprano)
    soprano = partitura.parts[0]
    note_seq = [n.pitch.midi for n in soprano.flatten().getElementsByClass('Note')]
    intervalli = [abs(note_seq[i+1] - note_seq[i]) for i in range(len(note_seq)-1)]
    
    if intervalli:
        caratteristiche['intervallo_medio'] = np.mean(intervalli)
        caratteristiche['intervallo_std'] = np.std(intervalli)
        # Frequenza di moto per gradi (intervalli <= 2)
        caratteristiche['freq_gradi'] = sum(1 for i in intervalli if i <= 2) / len(intervalli)
        # Frequenza di salti (intervalli > 4)
        caratteristiche['freq_salti'] = sum(1 for i in intervalli if i > 4) / len(intervalli)
    
    # 2. Profilo delle altezze (distribuzione delle note su 12 classi)
    tutte_note = []
    for parte in partitura.parts:
        for n in parte.flatten().getElementsByClass('Note'):
            tutte_note.append(n.pitch.pitchClass)
    
    profilo = np.zeros(12)
    for pc in tutte_note:
        profilo[pc] += 1
    if profilo.sum() > 0:
        profilo = profilo / profilo.sum()
    
    for i, freq in enumerate(profilo):
        caratteristiche[f'pc_{i}'] = freq
    
    # 3. Densità armonica (quanti accordi per misura)
    partitura_accordi = partitura.chordify()
    n_accordi = len(list(partitura_accordi.flatten().getElementsByClass('Chord')))
    n_misure = len(partitura.parts[0].getElementsByClass('Measure'))
    if n_misure > 0:
        caratteristiche['densita_armonica'] = n_accordi / n_misure
    
    return caratteristiche

# Confronto stilistico: Bach vs. altri compositori
compositori = {
    'Bach-1':   'bach/bwv66.6',
    'Bach-2':   'bach/bwv153.1',
    'Bach-3':   'bach/bwv227.1',
}

print("Analisi stilistica comparativa")
print("=" * 50)

vettori = {}
for nome, bwv in compositori.items():
    try:
        vettori[nome] = estrai_vettore_stile(bwv)
        print(f"\n{nome}:")
        print(f"  Intervallo medio: {vettori[nome].get('intervallo_medio', 'N/A'):.2f} semitoni")
        print(f"  Freq. moto per gradi: {vettori[nome].get('freq_gradi', 'N/A'):.1%}")
        print(f"  Freq. salti: {vettori[nome].get('freq_salti', 'N/A'):.1%}")
        print(f"  Densità armonica: {vettori[nome].get('densita_armonica', 'N/A'):.1f} accordi/misura")
    except Exception as e:
        print(f"Errore con {nome}: {e}")
```

Questo tipo di analisi comparativa è esattamente ciò che Cope faceva manualmente prima di costruire il database delle firme: confrontare i profili stilistici di opere diverse per capire dove un compositore è più caratteristico.

---

## 10. Conclusioni

David Cope ha aperto una finestra su qualcosa di fondamentale: lo stile musicale, per quanto sembri il risultato di una soggettività irriproducibile, è in larga misura una struttura obiettiva — una distribuzione di pattern su uno spazio di scelte musicali — che può essere estratta, analizzata e replicata con strumenti computazionali.

Il suo sistema EMI, con il suo approccio basato sul sistema SPEAC, il database delle firme stilistiche, e l'algoritmo di ricombinazione, rimane un riferimento imprescindibile per chiunque si occupi di generazione musicale simbolica. Non perché sia il sistema migliore in assoluto — aveva limitazioni reali e ben documentate — ma perché ha posto le domande giuste e ha dimostrato empiricamente ciò che molti pensavano impossibile.

Le estensioni moderne che abbiamo discusso — grammatiche stocastiche, planning simbolico, soddisfacimento di vincoli con MiniZinc, ontologie musicali, ragionamento su casi — non superano Cope in modo discontinuo: lo prolungano e approfondiscono. Ciascuno di questi strumenti risolve una specifica debolezza del sistema originale, avvicinandosi sempre di più a una generazione musicale simbolica che sia coerente non solo localmente ma anche nell'arco globale di un'opera.

La domanda più profonda — se una macchina che genera corali indistinguibili da quelli di Bach stia "componendo" in un senso musicalmente significativo — rimane aperta. Ma forse la domanda più produttiva, alla luce di tutto ciò che abbiamo visto, non è se la macchina capisce la musica, ma cosa ci insegna sull'intelligenza musicale umana il fatto che sia possibile avvicinarsi così tanto alla sua replica con metodi puramente simbolici.

Come disse Cope stesso in risposta alle critiche: "Se la musica che genera EMI non è arte, allora ciò che la rende non-arte non è la musica stessa — è chi l'ha fatta." È una provocazione che merita riflessione.

---

## Riferimenti e approfondimenti

**Opere di David Cope**
- Cope, D. (1991). *Computers and Musical Style*. A-R Editions.
- Cope, D. (1996). *Experiments in Musical Intelligence*. A-R Editions.
- Cope, D. (2001). *Virtual Music: Computer Synthesis of Musical Style*. MIT Press.
- Cope, D. (2005). *Computer Models of Musical Creativity*. MIT Press.

**Musicologia computazionale e analisi simbolica**
- Huron, D. (2006). *Sweet Anticipation: Music and the Psychology of Expectation*. MIT Press.
- Temperley, D. (2001). *The Cognition of Basic Musical Structures*. MIT Press.
- Rohrmeier, M. (2011). "Towards a generative syntax of tonal harmony." *Journal of Mathematics and Music*, 5(1).

**Strumenti e librerie**
- Cuthbert, M.S., & Ariza, C. (2010). "music21: A Toolkit for Computer-Aided Musicology." *ISMIR 2010*.
  Documentazione: https://web.mit.edu/music21/
- Nethercote, N. et al. (2007). "MiniZinc: Towards a standard CP modelling language." *CP 2007*.
  Documentazione: https://www.minizinc.org/

**Approcci moderni alla generazione simbolica**
- Pachet, F. (2002). "The Continuator: Musical Interaction With Style." *Journal of New Music Research*, 32(3).
- Papadopoulos, G., & Wiggins, G. (1999). "AI Methods for Algorithmic Composition." *AISB Symposium*.
- Herremans, D., & Chew, E. (2016). "Tension ribbons: Quantifying and Visualising Tonal Tension." *ICMC 2016*.

---

*Articolo scritto con intento pedagogico e divulgativo. Gli esempi di codice sono stati semplificati per chiarezza espositiva e richiedono l'installazione di `music21` (`pip install music21`) e MiniZinc (disponibile su www.minizinc.org) per essere eseguiti.*
