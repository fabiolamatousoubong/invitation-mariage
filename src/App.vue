<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const couple = 'Fabiola & Armel'
const weddingDate = '6 novembre 2026'
const firstName = ref('')
const lastName = ref('')
const attendance = ref(null)
const rsvpSent = ref(false)
const rsvpSending = ref(false)
const rsvpError = ref('')
const activeSection = ref('accueil')
const language = ref('fr')
const menuOpen = ref(false)
const authState = ref('checking')
const pin = ref('')
const pinError = ref('')
const pinSubmitting = ref(false)
const backgroundAudio = ref(null)
const musicPlaying = ref(false)
const translations = {
  fr: {
    home: 'Accueil', story: 'Notre histoire', rsvp: 'RSVP', gifts: 'Cadeaux', wedding: 'Notre mariage',
    menuOpen: 'Ouvrir le menu', menuClose: 'Fermer le menu', mainNavigation: 'Navigation principale', storyGalleryLabel: 'Photos de Fabiola et Armel',
    musicPlay: 'Lancer la musique', musicPause: 'Couper la musique',
    lockInvitation: 'Revenir au PIN',
    loginLoadingLabel: 'Chargement', loginEyebrow: 'Invitation privée', loginTitle: 'Bienvenue', loginCopy: 'Entrez le code PIN indiqué sur votre invitation pour découvrir notre mariage.', pinLabel: 'Code PIN', pinRequired: 'Veuillez saisir le code PIN.', pinIncorrect: 'Code PIN incorrect.', pinCheckError: 'Impossible de vérifier le code PIN.', verifying: 'Vérification...', openInvitation: "Ouvrir l'invitation",
    date: '6 novembre 2026', storyTitle: 'Une rencontre, une évidence, une promesse.',
    storyOne: "Tout a commencé en août 2018, lorsqu'un ami nous a mis en contact. Il m'a présentée à plusieurs de ses amis vivant dans différentes villes, parmi lesquels se trouvait Armel, le Berlinois. Intrigué, Armel a demandé mon numéro. Lorsque notre ami m'a demandé s'il pouvait le lui transmettre, j'ai accepté.",
    storyTwo: "Le premier jour où Armel m'a écrit, j'étais à l'église. Au milieu de ce lieu de paix, son message a fait naître en moi une émotion aussi soudaine que profonde. Sans encore connaître son regard autrement qu'à travers un écran, j'ai dit au Seigneur : « Merci de m'avoir donné mon mari. » Ces mots pouvaient sembler fous, trop grands pour un commencement si fragile, mais mon cœur venait de reconnaître quelque chose que ma raison ne savait pas encore expliquer. J'ai ressenti avec une force immense qu'il serait l'amour de ma vie.",
    storyThree: "Le Seigneur nous a fait grâce et, durant huit longs mois, notre relation s'est construite à distance avant même notre première rencontre. Il y avait des kilomètres entre nous, mais nos voix trouvaient toujours le chemin. Les appels audio qui se prolongeaient, les vidéos où un simple sourire suffisait à illuminer la journée, les messages du matin et ceux envoyés juste avant de fermer les yeux sont devenus notre manière de nous tenir la main. Nous apprenions à connaître nos rêves, nos blessures, nos convictions et nos silences. Chaque conversation ajoutait une pierre à ce lien invisible qui, jour après jour, devenait plus solide que la distance.",
    storyFour: "Attendre n'a pas toujours été facile. Il y a eu le manque, l'impatience, les questions et ces soirs où nous aurions voulu remplacer l'écran par une présence réelle. Pourtant, même dans l'incertitude, quelque chose en nous refusait d'abandonner. Nous avons appris la patience, la confiance et la vérité. Nous avons compris qu'aimer ne consiste pas seulement à partager les beaux jours, mais aussi à rassurer l'autre quand il doute, à écouter quand les mots tremblent et à choisir le « nous » même lorsque le chemin demande du courage. La distance n'a pas affaibli notre amour : elle lui a donné des racines profondes.",
    storyFive: "Puis est arrivé le moment que nous avions tant imaginé : celui où nos regards se sont enfin rencontrés sans caméra entre nous. Tout ce que nous avions construit dans nos conversations est devenu réel. Une voix avait désormais une présence, un sourire pouvait être touché du regard, et l'attente prenait soudain tout son sens. Ce jour-là, nous n'avons pas découvert des inconnus ; nous avons retrouvé la personne que notre cœur connaissait déjà. Ce fut une émotion difficile à décrire, un mélange de gratitude, de paix et de joie, comme si deux chemins jusque-là séparés venaient enfin de se rejoindre.",
    storySix: "Depuis, notre amour a grandi dans les grands projets comme dans les gestes les plus simples. Il vit dans nos éclats de rire, dans nos prières, dans les encouragements donnés au bon moment et dans cette façon de nous rappeler que nous sommes une équipe. Nous avons connu des défis, des ajustements et des saisons différentes, mais chacun d'eux nous a appris à mieux nous aimer. Armel est devenu mon refuge, mon confident et celui auprès de qui je peux être pleinement moi-même. Ensemble, nous avons découvert que l'amour véritable n'est pas seulement un sentiment magnifique : c'est une décision douce et courageuse que l'on renouvelle chaque jour.",
    storySeven: "Aujourd'hui, lorsque nous regardons le chemin parcouru depuis août 2018, nos cœurs débordent de reconnaissance. Rien de tout cela n'était banal : ni cette mise en contact par un ami, ni ce premier message reçu à l'église, ni ces huit mois pendant lesquels la distance nous a appris à croire l'un en l'autre. Chaque attente, chaque prière et chaque retrouvailles nous ont conduits jusqu'à cette promesse. Le 6 novembre 2026, nous ne célébrerons pas seulement une cérémonie. Nous dirons oui à tout ce que nous avons déjà traversé, à la vie que nous voulons bâtir, aux rêves que nous porterons ensemble et à la grâce de pouvoir avancer côte à côte.",
    storyEight: "Ce oui sera notre façon de dire : je te choisis dans la lumière comme dans les jours plus fragiles ; je choisis de prendre soin de ton cœur, de grandir avec toi et de faire de notre amour un foyer. Et si notre histoire nous a appris une chose, c'est que les plus belles promesses commencent parfois par un simple message. La nôtre a traversé les kilomètres, le temps et l'attente. Elle est devenue une évidence, puis une espérance, et bientôt elle deviendra l'engagement de toute une vie. Avec une émotion immense, nous ouvrons maintenant ce nouveau chapitre, entourés de ceux que nous aimons, le cœur rempli de gratitude et les yeux tournés vers l'avenir.",
    schedule: 'Le programme de notre journée', civilTime: '10h45 précises', civil: 'Cérémonie civile', civilText: "Nous nous dirons oui à l'état civil, puis prendrons le temps d'immortaliser ces précieux moments avec nos proches.", eveningVenue: 'Lieu de la soirée',
    after: 'Après la cérémonie', toast: 'Un verre aux mariés', toastText: "Retrouvons-nous autour d'un verre pour trinquer ensemble à cette belle nouvelle étape de notre vie.", eveningTime: 'À partir de 20h00', evening: 'La soirée', eveningText: "Nous avons le plaisir de vous offrir une soirée en l'honneur de notre mariage.",
    children: 'Une petite précision concernant les enfants :', childrenText: "en raison du nombre limité de places, nous ne pourrons malheureusement pas accueillir les enfants lors de la soirée. Merci de prévoir leur garde afin que chacun puisse profiter pleinement de ce beau moment.", punctuality: "Nous comptons sur votre ponctualité, à la mairie comme à la soirée, afin que chaque moment se déroule dans les meilleures conditions.",
    rsvpTitle: 'Partagerez-vous cette journée avec nous ?', deadline: 'Merci de nous confirmer votre présence à la réception au plus tard le 30 septembre 2026.', firstNames: 'Prénoms', firstPlaceholder: 'Entrez vos prénoms', lastName: 'Nom', lastPlaceholder: 'Entrez votre nom', attending: 'Serez-vous présent(e) à la réception ?', yes: 'Avec joie', no: 'Malheureusement non', send: 'Envoyer ma réponse', thanks: 'Merci', recorded: 'Votre réponse est bien enregistrée.', confirmation: 'Nous avons hâte de vous retrouver pour célébrer cette journée.', incomplete: 'Veuillez renseigner vos prénoms, votre nom et votre réponse.', sendError: "L'envoi a échoué. Réessayez dans quelques instants.",
    giftEyebrow: 'Une pensée pour vous', giftTitle: 'Votre joie à nos côtés rendra cette journée inoubliable.', giftOne: "Réunir les personnes que nous aimons est ce qui compte le plus pour nous. Vos rires, votre bienveillance et les instants partagés donneront toute sa beauté à notre célébration.", giftTwo: "Nous n'avons pas préparé de liste particulière. Si le cœur vous en dit, un présent choisi avec affection sera reçu avec beaucoup de gratitude, mais votre présence est déjà un merveilleux geste pour nous.", paypal: 'Via PayPal', onlineGift: 'Un cadeau en ligne', account: 'Compte', subject: 'Objet', transfer: 'Via virement bancaire', newLife: 'Pour notre nouvelle vie', name: 'Nom', giftSubject: 'Cadeaux mariage de Fabiola et Armel', affection: 'Avec toute notre affection', homeLabel: "Retour à l'accueil", openMaps: 'Ouvrir dans Google Maps'
  },
  de: {
    home: 'Startseite', story: 'Unsere Geschichte', rsvp: 'RSVP', gifts: 'Geschenke', wedding: 'Unsere Hochzeit',
    menuOpen: 'Menü öffnen', menuClose: 'Menü schließen', mainNavigation: 'Hauptnavigation', storyGalleryLabel: 'Fotos von Fabiola und Armel',
    musicPlay: 'Musik starten', musicPause: 'Musik ausschalten',
    lockInvitation: 'Zur PIN-Seite',
    loginLoadingLabel: 'Wird geladen', loginEyebrow: 'Private Einladung', loginTitle: 'Willkommen', loginCopy: 'Gebt den PIN-Code von eurer Einladung ein, um unsere Hochzeit zu entdecken.', pinLabel: 'PIN-Code', pinRequired: 'Bitte gebt den PIN-Code ein.', pinIncorrect: 'Der PIN-Code ist nicht korrekt.', pinCheckError: 'Der PIN-Code konnte nicht überprüft werden.', verifying: 'Wird geprüft...', openInvitation: 'Einladung öffnen',
    date: '6. November 2026', storyTitle: 'Eine Begegnung, eine Gewissheit, ein Versprechen.',
    storyOne: 'Alles begann im August 2018, als ein Freund uns miteinander bekannt machte. Er stellte mich mehreren seiner Freunde vor, die in verschiedenen Städten lebten, darunter Armel, der Berliner. Neugierig fragte Armel nach meiner Nummer. Als unser Freund mich fragte, ob er sie ihm geben dürfe, sagte ich ja.',
    storyTwo: 'Als Armel mir zum ersten Mal schrieb, war ich in der Kirche. Inmitten dieses friedlichen Ortes löste seine Nachricht in mir ein plötzliches und tiefes Gefühl aus. Noch bevor ich seinen Blick außerhalb eines Bildschirms kannte, sagte ich zum Herrn: „Danke, dass du mir meinen Mann geschenkt hast.“ Diese Worte mochten für einen so zarten Anfang viel zu groß erscheinen, doch mein Herz hatte etwas erkannt, das mein Verstand noch nicht erklären konnte. Ich spürte mit großer Gewissheit, dass er die Liebe meines Lebens sein würde.',
    storyThree: 'Der Herr schenkte uns seine Gnade, und acht lange Monate lang wuchs unsere Beziehung auf Distanz, noch bevor wir uns zum ersten Mal begegneten. Kilometer lagen zwischen uns, doch unsere Stimmen fanden immer zueinander. Lange Telefonate, Videoanrufe, bei denen ein einziges Lächeln den ganzen Tag heller machte, Nachrichten am Morgen und kurz vor dem Einschlafen wurden zu unserer Art, uns an den Händen zu halten. Wir lernten unsere Träume, Verletzlichkeiten, Überzeugungen und sogar unser Schweigen kennen. Mit jedem Gespräch wurde das unsichtbare Band zwischen uns stärker als die Entfernung.',
    storyFour: 'Das Warten war nicht immer leicht. Es gab Sehnsucht, Ungeduld, Fragen und Abende, an denen wir den Bildschirm so gern gegen echte Nähe eingetauscht hätten. Doch selbst in unsicheren Momenten wollte etwas in uns nicht aufgeben. Wir lernten Geduld, Vertrauen und Ehrlichkeit. Wir verstanden, dass Liebe nicht nur bedeutet, die schönen Tage zu teilen, sondern den anderen zu stärken, wenn er zweifelt, zuzuhören, wenn die Worte zittern, und sich auch dann für das „Wir“ zu entscheiden, wenn der Weg Mut verlangt. Die Entfernung schwächte unsere Liebe nicht — sie gab ihr tiefe Wurzeln.',
    storyFive: 'Dann kam endlich der Augenblick, den wir uns so oft vorgestellt hatten: Unsere Blicke begegneten sich ohne eine Kamera zwischen uns. Alles, was wir in unseren Gesprächen aufgebaut hatten, wurde plötzlich greifbar. Eine vertraute Stimme hatte nun eine wirkliche Nähe, ein Lächeln war nicht länger nur auf einem Bildschirm zu sehen, und das lange Warten bekam seinen Sinn. An diesem Tag trafen sich keine Fremden; wir fanden den Menschen wieder, den unser Herz längst kannte. Es war eine kaum zu beschreibende Mischung aus Dankbarkeit, Frieden und Freude — als hätten zwei getrennte Wege endlich zusammengefunden.',
    storySix: 'Seitdem ist unsere Liebe in großen Plänen ebenso gewachsen wie in den kleinen Gesten des Alltags. Sie lebt in unserem Lachen, in unseren Gebeten, in ermutigenden Worten und in der Gewissheit, ein Team zu sein. Wir haben Herausforderungen, Veränderungen und unterschiedliche Lebensphasen erlebt, doch jede davon hat uns gelehrt, einander besser zu lieben. Armel wurde zu meinem sicheren Ort, meinem Vertrauten und dem Menschen, bei dem ich ganz ich selbst sein darf. Gemeinsam haben wir erfahren, dass wahre Liebe nicht nur ein wunderschönes Gefühl ist, sondern eine sanfte und mutige Entscheidung, die man jeden Tag neu trifft.',
    storySeven: 'Wenn wir heute auf den Weg seit August 2018 zurückblicken, sind unsere Herzen voller Dankbarkeit. Nichts davon war selbstverständlich: weder die Begegnung durch einen Freund noch die erste Nachricht in der Kirche, noch die acht Monate, in denen die Entfernung uns lehrte, aneinander zu glauben. Jedes Warten, jedes Gebet und jedes Wiedersehen hat uns zu diesem Versprechen geführt. Am 6. November 2026 feiern wir nicht nur eine Zeremonie. Wir sagen Ja zu allem, was wir bereits gemeinsam getragen haben, zu dem Leben, das wir aufbauen möchten, und zu der Gnade, Seite an Seite weiterzugehen.',
    storyEight: 'Dieses Ja bedeutet: Ich wähle dich im Licht und an den zerbrechlichen Tagen; ich will dein Herz behüten, mit dir wachsen und aus unserer Liebe ein Zuhause machen. Unsere Geschichte hat uns gezeigt, dass die schönsten Versprechen manchmal mit einer einfachen Nachricht beginnen. Unsere Liebe hat Entfernung, Zeit und Warten überstanden. Sie wurde zu Gewissheit, dann zu Hoffnung und wird nun zum Versprechen eines ganzen Lebens. Mit großer Freude öffnen wir dieses neue Kapitel — umgeben von den Menschen, die wir lieben, voller Dankbarkeit und mit dem Blick auf unsere gemeinsame Zukunft.',
    schedule: 'Unser Tagesablauf', civilTime: 'Pünktlich um 10:45 Uhr', civil: 'Standesamtliche Trauung', civilText: 'Wir werden uns auf dem Standesamt das Ja-Wort geben und anschließend diese kostbaren Momente mit unseren Liebsten in Bildern festhalten.', eveningVenue: 'Ort der Feier',
    after: 'Nach der Zeremonie', toast: 'Ein Toast auf das Brautpaar', toastText: 'Anschließend stoßen wir gemeinsam auf diesen schönen neuen Lebensabschnitt an.', eveningTime: 'Ab 20:00 Uhr', evening: 'Die Feier', eveningText: 'Wir freuen uns, euch zu einer Feier anlässlich unserer Hochzeit einzuladen.',
    children: 'Ein Hinweis zu Kindern:', childrenText: 'Da die Anzahl der Plätze begrenzt ist, können wir Kinder leider nicht zur Abendfeier einladen. Bitte organisiert eine Betreuung, damit alle diesen schönen Moment genießen können.', punctuality: 'Wir bitten euch um Pünktlichkeit, sowohl beim Standesamt als auch bei der Feier, damit jeder Moment des Tages reibungslos abläuft.',
    rsvpTitle: 'Werdet ihr diesen Tag mit uns verbringen?', deadline: 'Bitte bestätigt eure Teilnahme an der Feier bis spätestens 30. September 2026.', firstNames: 'Vornamen', firstPlaceholder: 'Gebt eure Vornamen ein', lastName: 'Nachname', lastPlaceholder: 'Gebt euren Nachnamen ein', attending: 'Werdet ihr an der Feier teilnehmen?', yes: 'Sehr gerne', no: 'Leider nicht', send: 'Antwort senden', thanks: 'Danke', recorded: 'Eure Antwort wurde gespeichert.', confirmation: 'Wir freuen uns darauf, diesen Tag mit euch zu feiern.', incomplete: 'Bitte gebt eure Vornamen, euren Nachnamen und eure Antwort an.', sendError: 'Das Senden ist fehlgeschlagen. Bitte versucht es erneut.',
    giftEyebrow: 'Ein Gedanke für euch', giftTitle: 'Eure Freude an unserer Seite macht diesen Tag unvergesslich.', giftOne: 'Die Menschen, die wir lieben, um uns zu haben, bedeutet uns alles. Euer Lachen, eure Herzlichkeit und die gemeinsam verbrachte Zeit machen unsere Feier vollkommen.', giftTwo: 'Wir haben keine Geschenkeliste vorbereitet. Wenn ihr möchtet, freuen wir uns über ein mit Liebe ausgewähltes Geschenk. Eure Anwesenheit ist jedoch bereits ein wundervolles Geschenk.', paypal: 'Über PayPal', onlineGift: 'Ein Geschenk online', account: 'Konto', subject: 'Verwendungszweck', transfer: 'Per Banküberweisung', newLife: 'Für unser neues Leben', name: 'Name', giftSubject: 'Hochzeitsgeschenk für Fabiola und Armel', affection: 'Mit all unserer Liebe', homeLabel: 'Zur Startseite', openMaps: 'In Google Maps öffnen'
  }
}
const t = computed(() => translations[language.value])

async function navigateTo(section) {
  activeSection.value = section
  menuOpen.value = false
  await nextTick()
  if (section === 'accueil') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function closeMenuOnEscape(event) {
  if (event.key === 'Escape') menuOpen.value = false
}

async function playBackgroundMusic() {
  if (!backgroundAudio.value || musicPlaying.value) return

  try {
    backgroundAudio.value.volume = 0.35
    await backgroundAudio.value.play()
    musicPlaying.value = true
    window.removeEventListener('pointerdown', playMusicAfterInteraction)
    window.removeEventListener('keydown', playMusicAfterInteraction)
  } catch {
    musicPlaying.value = false
  }
}

function pauseBackgroundMusic() {
  backgroundAudio.value?.pause()
  musicPlaying.value = false
}

function toggleBackgroundMusic() {
  if (musicPlaying.value) {
    pauseBackgroundMusic()
    return
  }

  playBackgroundMusic()
}

function playMusicAfterInteraction() {
  if (authState.value !== 'authenticated') return
  playBackgroundMusic()
}

async function checkAuthentication() {
  try {
    const response = await fetch('/api/auth', { credentials: 'include' })
    const data = await response.json()
    authState.value = data.authenticated ? 'authenticated' : 'locked'
  } catch {
    authState.value = 'locked'
  }
}

async function lockInvitation() {
  pauseBackgroundMusic()
  menuOpen.value = false

  try {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
  } finally {
    authState.value = 'locked'
    pin.value = ''
    pinError.value = ''
    await nextTick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

async function submitPin() {
  if (!pin.value.trim()) {
    pinError.value = t.value.pinRequired
    return
  }

  pinSubmitting.value = true
  pinError.value = ''
  const musicStart = playBackgroundMusic()

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: pin.value.trim() }),
    })
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      pauseBackgroundMusic()
      throw new Error(response.status === 401 ? t.value.pinIncorrect : data.error || t.value.pinCheckError)
    }

    await musicStart
    pin.value = ''
    authState.value = 'authenticated'
    await nextTick()
    playBackgroundMusic()
  } catch (error) {
    pinError.value = error.message || t.value.pinCheckError
  } finally {
    pinSubmitting.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', closeMenuOnEscape)
  window.addEventListener('pointerdown', playMusicAfterInteraction)
  window.addEventListener('keydown', playMusicAfterInteraction)
  checkAuthentication()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', closeMenuOnEscape)
  window.removeEventListener('pointerdown', playMusicAfterInteraction)
  window.removeEventListener('keydown', playMusicAfterInteraction)
})

async function submitRsvp() {
  if (!firstName.value.trim() || !lastName.value.trim() || !attendance.value) {
    rsvpError.value = t.value.incomplete
    return
  }

  rsvpSending.value = true
  rsvpError.value = ''

  try {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        attendance: attendance.value,
        language: language.value,
      }),
    })

    if (!response.ok) throw new Error('RSVP failed')
    rsvpSent.value = true
  } catch {
    rsvpError.value = t.value.sendError
  } finally {
    rsvpSending.value = false
  }
}
</script>

<template>
  <v-app :lang="language">
    <audio ref="backgroundAudio" src="/music/tes-ma-femme-tes-la-plus-belle.mp3" loop preload="auto"></audio>

    <v-main v-if="authState === 'checking'" class="login-screen login-screen--loading">
      <div class="login-loader" :aria-label="t.loginLoadingLabel"></div>
    </v-main>

    <v-main v-else-if="authState === 'locked'" class="login-screen">
      <div class="login-decoration login-decoration--one" aria-hidden="true"></div>
      <div class="login-decoration login-decoration--two" aria-hidden="true"></div>

      <section class="login-card" aria-labelledby="login-title">
        <div class="language-switcher login-language"><button :class="{ active: language === 'fr' }" @click="language = 'fr'">FR</button><span>/</span><button :class="{ active: language === 'de' }" @click="language = 'de'">DE</button></div>
        <div class="login-monogram" aria-hidden="true">F&amp;A</div>
        <p class="login-eyebrow">{{ t.loginEyebrow }}</p>
        <h1 id="login-title">{{ t.loginTitle }}</h1>
        <p class="login-copy">{{ t.loginCopy }}</p>

        <form class="pin-form" @submit.prevent="submitPin">
          <label for="invitation-pin">{{ t.pinLabel }}</label>
          <input
            id="invitation-pin"
            v-model="pin"
            type="password"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="12"
            placeholder="••••"
            autofocus
            required
          />
          <p v-if="pinError" class="pin-error" role="alert">{{ pinError }}</p>
          <button type="submit" :disabled="pinSubmitting">
            <span v-if="pinSubmitting" class="pin-spinner" aria-hidden="true"></span>
            {{ pinSubmitting ? t.verifying : t.openInvitation }}
          </button>
        </form>

        <p class="login-signature">Fabiola &amp; Armel · 6 novembre 2026</p>
      </section>
    </v-main>

    <v-main v-else>
      <section class="hero">
        <v-container class="hero__content">
          <header class="site-header" :class="{ 'site-header--open': menuOpen }">
            <button class="monogram" type="button" :aria-label="t.homeLabel" @click="navigateTo('accueil')">F&A</button>
            <button
              class="menu-toggle"
              type="button"
              :aria-expanded="menuOpen"
              aria-controls="main-navigation"
              :aria-label="menuOpen ? t.menuClose : t.menuOpen"
              @click="menuOpen = !menuOpen"
            ><span></span><span></span><span></span></button>
            <nav id="main-navigation" :aria-label="t.mainNavigation">
              <button type="button" :class="{ active: activeSection === 'accueil' }" @click="navigateTo('accueil')">{{ t.home }}</button>
              <button type="button" :class="{ active: activeSection === 'histoire' }" @click="navigateTo('histoire')">{{ t.story }}</button>
              <button type="button" :class="{ active: activeSection === 'rsvp' }" @click="navigateTo('rsvp')">RSVP</button>
              <button type="button" :class="{ active: activeSection === 'cadeaux' }" @click="navigateTo('cadeaux')">{{ t.gifts }}</button>
            </nav>
            <div class="language-switcher"><button :class="{ active: language === 'fr' }" @click="language = 'fr'">FR</button><span>/</span><button :class="{ active: language === 'de' }" @click="language = 'de'">DE</button></div>
          </header>
          <div class="hero-layout">
            <div class="hero-layout__photo-frame">
              <img class="hero-layout__photo" src="./assets/WhatsApp Image 2026-09-16 at 20.20.23.jpeg" alt="Fabiola et Armel" />
            </div>
            <div class="hero-layout__copy">
              <p class="eyebrow">{{ t.wedding }}</p>
              <h1>{{ couple }}</h1>
              <p class="hero__date">{{ t.date }} · Berlin</p>
            </div>
          </div>
        </v-container>
      </section>

      <section v-if="activeSection === 'histoire'" id="histoire" class="story-section">
        <span class="floral-accent floral-accent--story" aria-hidden="true"></span>
        <v-container class="story-wrap">
          <div>
            <p class="eyebrow">{{ t.story }}</p>
            <h2>{{ t.storyTitle }}</h2>
          </div>
          <div class="story-copy">
            <p>{{ t.storyOne }}</p>
            <p>{{ t.storyTwo }}</p>
            <p>{{ t.storyThree }}</p>
            <p>{{ t.storyFour }}</p>
            <p>{{ t.storyFive }}</p>
            <p>{{ t.storySix }}</p>
            <p>{{ t.storySeven }}</p>
            <p class="story-copy__closing">{{ t.storyEight }}</p>
          </div>
          <div class="story-gallery" :aria-label="t.storyGalleryLabel">
            <img src="./assets/WhatsApp Image 2026-09-16 at 20.00.11.jpeg" alt="Fabiola et Armel" />
            <img src="./assets/WhatsApp Image 2026-09-16 at 20.03.33.jpeg" alt="Fabiola et Armel" />
            <img class="story-gallery__portrait" src="./assets/WhatsApp Image 2026-09-16 at 20.04.25.jpeg" alt="Fabiola et Armel" />
            <img src="./assets/WhatsApp Image 2026-09-16 at 20.07.47.jpeg" alt="Fabiola et Armel" />
            <img src="./assets/WhatsApp Image 2026-09-16 at 20.18.27.jpeg" alt="Fabiola et Armel" />
            <img src="./assets/WhatsApp Image 2026-09-16 at 20.19.39.jpeg" alt="Fabiola et Armel" />
            <img src="./assets/WhatsApp Image 2026-09-16 at 20.20.23.jpeg" alt="Fabiola et Armel" />
          </div>
        </v-container>
      </section>

      <section v-if="activeSection === 'accueil'" id="programme" class="schedule-section">
        <v-container class="schedule-wrap">
          <div class="schedule-heading">
            <p class="eyebrow">{{ t.date }}</p>
            <h2>{{ t.schedule }}</h2>
          </div>
          <div class="schedule-list">
            <article class="schedule-item">
              <p class="schedule-time">{{ t.civilTime }}</p>
              <div>
                <h3>{{ t.civil }}</h3><p>{{ t.civilText }}</p>
                <a class="venue-address" href="https://www.google.com/maps/search/?api=1&query=Guthaus+Mahlsdorf%2C+Hultschiner+Damm+333%2C+12623+Berlin" target="_blank" rel="noopener">
                  <span class="venue-address__pin" aria-hidden="true">●</span>
                  <span class="venue-address__content">
                    <strong>Guthaus Mahlsdorf</strong>
                    <span>Hultschiner Damm 333<br />12623 Berlin</span>
                    <small>{{ t.openMaps }} →</small>
                  </span>
                </a>
              </div>
            </article>
            <article class="schedule-item">
              <p class="schedule-time">{{ t.after }}</p>
              <div>
                <h3>{{ t.toast }}</h3><p>{{ t.toastText }}</p>
              </div>
            </article>
            <article class="schedule-item">
              <p class="schedule-time">{{ t.eveningTime }}</p>
              <div>
                <h3>{{ t.evening }}</h3><p>{{ t.eveningText }}</p>
                <a class="venue-address" href="https://www.google.com/maps/search/?api=1&query=Schwalbenweg+7%2C+12529+Sch%C3%B6nefeld" target="_blank" rel="noopener">
                  <span class="venue-address__pin" aria-hidden="true">●</span>
                  <span class="venue-address__content">
                    <strong>{{ t.eveningVenue }}</strong>
                    <span>Schwalbenweg 7<br />12529 Schönefeld</span>
                    <small>{{ t.openMaps }} →</small>
                  </span>
                </a>
              </div>
            </article>
          </div>
          <p class="children-note"><strong>{{ t.children }}</strong> {{ t.childrenText }}</p><p class="punctuality-note">{{ t.punctuality }}</p>
        </v-container>
      </section>

      <section v-if="activeSection === 'rsvp'" id="rsvp" class="rsvp-section">
        <v-container class="rsvp-wrap">
          <div class="rsvp-heading">
            <p class="eyebrow">RSVP</p>
            <h2>{{ t.rsvpTitle }}</h2><p>{{ t.deadline }}</p>
          </div>

          <v-card class="rsvp-card" elevation="0">
            <v-card-text v-if="!rsvpSent">
              <v-form @submit.prevent="submitRsvp">
                <p class="field-label">{{ t.firstNames }}</p>
                <v-text-field
                  v-model="firstName"
                  :placeholder="t.firstPlaceholder"
                  variant="outlined"
                  hide-details
                  required
                />
                <p class="field-label field-label--spaced">{{ t.lastName }}</p>
                <v-text-field
                  v-model="lastName"
                  :placeholder="t.lastPlaceholder"
                  variant="outlined"
                  hide-details
                  required
                />
                <p class="field-label field-label--spaced">{{ t.attending }}</p>
                <div class="attendance-options" role="radiogroup" :aria-label="t.attending">
                  <label>
                    <input v-model="attendance" type="radio" name="attendance" value="yes" required />
                    {{ t.yes }}
                  </label>
                  <label>
                    <input v-model="attendance" type="radio" name="attendance" value="no" required />
                    {{ t.no }}
                  </label>
                </div>
                <v-alert v-if="rsvpError" class="mb-4" color="error" variant="tonal">{{ rsvpError }}</v-alert>
                <v-btn color="primary" type="submit" block size="large" :loading="rsvpSending" :disabled="rsvpSending">{{ t.send }}</v-btn>
              </v-form>
            </v-card-text>
            <v-card-text v-else class="rsvp-confirmation">
              <p class="eyebrow">{{ t.thanks }}</p><h3>{{ t.recorded }}</h3><p>{{ t.confirmation }}</p>
            </v-card-text>
          </v-card>
        </v-container>
      </section>

      <section v-if="activeSection === 'cadeaux'" id="cadeaux" class="gifts-section">
        <v-container class="content-wrap">
          <div class="section-heading">
            <p class="eyebrow">{{ t.giftEyebrow }}</p><h2>{{ t.giftTitle }}</h2>
          </div>

          <div class="message">
            <p>{{ t.giftOne }}</p><p>{{ t.giftTwo }}</p>
          </div>

          <div class="gift-details">
            <article class="gift-option">
              <p class="card-label">{{ t.paypal }}</p><h3>{{ t.onlineGift }}</h3>
              <dl>
                <div><dt>{{ t.account }}</dt><dd>fabiolamatou@gmail.com</dd></div><div><dt>{{ t.subject }}</dt><dd>{{ t.giftSubject }}</dd></div>
              </dl>
            </article>
            <article class="gift-option">
              <p class="card-label">{{ t.transfer }}</p><h3>{{ t.newLife }}</h3>
              <dl>
                <div><dt>{{ t.name }}</dt><dd>Matou Soubong Fabiola</dd></div>
                <div><dt>IBAN</dt><dd>DE16 5007 0024 0777 5158 00</dd></div>
                <div><dt>{{ t.subject }}</dt><dd>{{ t.giftSubject }}</dd></div>
              </dl>
            </article>
          </div>
        </v-container>
      </section>

      <footer>
        <p>{{ t.affection }}</p>
        <strong>{{ couple }}</strong>
        <a href="mailto:fabiolamatou@gmail.com">fabiolamatou@gmail.com</a>
      </footer>

      <button
        class="music-toggle"
        type="button"
        :aria-label="musicPlaying ? t.musicPause : t.musicPlay"
        :title="musicPlaying ? t.musicPause : t.musicPlay"
        @click="toggleBackgroundMusic"
      >{{ musicPlaying ? 'II' : '♪' }}</button>

      <button class="lock-toggle" type="button" @click="lockInvitation">{{ t.lockInvitation }}</button>
    </v-main>
  </v-app>
</template>
