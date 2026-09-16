<script setup>
import { computed, ref } from 'vue'

const couple = 'Fabiola & Armel'
const weddingDate = '6 novembre 2026'
const firstName = ref('')
const lastName = ref('')
const attendance = ref(null)
const companion = ref('')
const rsvpSent = ref(false)
const activeSection = ref('accueil')
const language = ref('fr')
const translations = {
  fr: {
    home: 'Accueil', story: 'Notre histoire', rsvp: 'RSVP', gifts: 'Cadeaux', wedding: 'Notre mariage',
    date: '6 novembre 2026', storyTitle: 'Une rencontre, une évidence, une promesse.',
    storyOne: "Tout a commencé en août 2018, lorsqu'un ami nous a mis en contact. Il m'a présentée à plusieurs de ses amis vivant dans différentes villes, parmi lesquels se trouvait Armel, le Berlinois. Intrigué, Armel a demandé mon numéro. Lorsque notre ami m'a demandé s'il pouvait le lui transmettre, j'ai accepté.",
    storyTwo: "Le premier jour où Armel m'a écrit, j'étais à l'église. J'ai alors dit au Seigneur : « Merci de m'avoir donné mon mari », car j'ai ressenti avec force qu'il était l'amour de ma vie. Le Seigneur nous a fait grâce. Pendant huit mois, notre relation s'est construite à distance, avant même notre première rencontre : nos appels vidéo et audio ont rendu notre amour toujours plus solide.",
    schedule: 'Le programme de notre journée', civilTime: '10h45 précises', civil: 'Cérémonie civile', civilText: "Nous nous dirons oui à l'état civil, puis prendrons le temps d'immortaliser ces précieux moments avec nos proches.",
    after: 'Après la cérémonie', toast: 'Un verre aux mariés', toastText: "Retrouvons-nous autour d'un verre pour trinquer ensemble à cette belle nouvelle étape de notre vie.", eveningTime: 'À partir de 20h00', evening: 'La soirée', eveningText: "Nous avons le plaisir de vous offrir une soirée en l'honneur de notre mariage.",
    children: 'Une petite précision concernant les enfants :', childrenText: "en raison du nombre limité de places, nous ne pourrons malheureusement pas accueillir les enfants lors de la soirée. Merci de prévoir leur garde afin que chacun puisse profiter pleinement de ce beau moment.", punctuality: "Nous comptons sur votre ponctualité, à la mairie comme à la soirée, afin que chaque moment se déroule dans les meilleures conditions.",
    rsvpTitle: 'Partagerez-vous cette journée avec nous ?', deadline: 'Merci de nous confirmer votre présence à la réception au plus tard le 30 septembre 2026.', firstNames: 'Prénoms', firstPlaceholder: 'Entrez vos prénoms', lastName: 'Nom', lastPlaceholder: 'Entrez votre nom', attending: 'Serez-vous présent(e) à la réception ?', yes: 'Avec joie', no: 'Malheureusement non', companion: 'Serez-vous accompagné(e) ?', alone: 'Seul(e)', couple: 'En couple', guest: 'Avec un accompagnant', send: 'Envoyer ma réponse', thanks: 'Merci', recorded: 'Votre réponse est bien enregistrée.', confirmation: 'Nous avons hâte de vous retrouver pour célébrer cette journée.',
    giftEyebrow: 'Une pensée pour vous', giftTitle: 'Votre joie à nos côtés rendra cette journée inoubliable.', giftOne: "Réunir les personnes que nous aimons est ce qui compte le plus pour nous. Vos rires, votre bienveillance et les instants partagés donneront toute sa beauté à notre célébration.", giftTwo: "Nous n'avons pas préparé de liste particulière. Si le cœur vous en dit, un présent choisi avec affection sera reçu avec beaucoup de gratitude, mais votre présence est déjà un merveilleux geste pour nous.", paypal: 'Via PayPal', onlineGift: 'Un cadeau en ligne', account: 'Compte', subject: 'Objet', transfer: 'Via virement bancaire', newLife: 'Pour notre nouvelle vie', name: 'Nom', giftSubject: 'Cadeaux mariage de Fabiola et Armel', affection: 'Avec toute notre affection', homeLabel: "Retour à l'accueil"
  },
  de: {
    home: 'Startseite', story: 'Unsere Geschichte', rsvp: 'RSVP', gifts: 'Geschenke', wedding: 'Unsere Hochzeit',
    date: '6. November 2026', storyTitle: 'Eine Begegnung, eine Gewissheit, ein Versprechen.',
    storyOne: 'Alles begann im August 2018, als ein Freund uns miteinander bekannt machte. Er stellte mich mehreren seiner Freunde vor, die in verschiedenen Städten lebten, darunter Armel, der Berliner. Neugierig fragte Armel nach meiner Nummer. Als unser Freund mich fragte, ob er sie ihm geben dürfe, sagte ich ja.',
    storyTwo: 'Als Armel mir zum ersten Mal schrieb, war ich in der Kirche. Ich sagte zum Herrn: „Danke, dass du mir meinen Mann geschenkt hast“, denn ich spürte tief in mir, dass er die Liebe meines Lebens war. Der Herr hat uns Gnade erwiesen. Acht Monate lang wuchs unsere Beziehung auf Distanz, noch vor unserem ersten Treffen: Video- und Telefonate machten unsere Liebe immer stärker.',
    schedule: 'Unser Tagesablauf', civilTime: 'Pünktlich um 10:45 Uhr', civil: 'Standesamtliche Trauung', civilText: 'Wir werden uns auf dem Standesamt das Ja-Wort geben und anschließend diese kostbaren Momente mit unseren Liebsten in Bildern festhalten.',
    after: 'Nach der Zeremonie', toast: 'Ein Toast auf das Brautpaar', toastText: 'Anschließend stoßen wir gemeinsam auf diesen schönen neuen Lebensabschnitt an.', eveningTime: 'Ab 20:00 Uhr', evening: 'Die Feier', eveningText: 'Wir freuen uns, euch zu einer Feier anlässlich unserer Hochzeit einzuladen.',
    children: 'Ein Hinweis zu Kindern:', childrenText: 'Da die Anzahl der Plätze begrenzt ist, können wir Kinder leider nicht zur Abendfeier einladen. Bitte organisiert eine Betreuung, damit alle diesen schönen Moment genießen können.', punctuality: 'Wir bitten euch um Pünktlichkeit, sowohl beim Standesamt als auch bei der Feier, damit jeder Moment des Tages reibungslos abläuft.',
    rsvpTitle: 'Werdet ihr diesen Tag mit uns verbringen?', deadline: 'Bitte bestätigt eure Teilnahme an der Feier bis spätestens 30. September 2026.', firstNames: 'Vornamen', firstPlaceholder: 'Gebt eure Vornamen ein', lastName: 'Nachname', lastPlaceholder: 'Gebt euren Nachnamen ein', attending: 'Werdet ihr an der Feier teilnehmen?', yes: 'Sehr gerne', no: 'Leider nicht', companion: 'Kommt ihr in Begleitung?', alone: 'Allein', couple: 'Als Paar', guest: 'Mit einer Begleitperson', send: 'Antwort senden', thanks: 'Danke', recorded: 'Eure Antwort wurde gespeichert.', confirmation: 'Wir freuen uns darauf, diesen Tag mit euch zu feiern.',
    giftEyebrow: 'Ein Gedanke für euch', giftTitle: 'Eure Freude an unserer Seite macht diesen Tag unvergesslich.', giftOne: 'Die Menschen, die wir lieben, um uns zu haben, bedeutet uns alles. Euer Lachen, eure Herzlichkeit und die gemeinsam verbrachte Zeit machen unsere Feier vollkommen.', giftTwo: 'Wir haben keine Geschenkeliste vorbereitet. Wenn ihr möchtet, freuen wir uns über ein mit Liebe ausgewähltes Geschenk. Eure Anwesenheit ist jedoch bereits ein wundervolles Geschenk.', paypal: 'Über PayPal', onlineGift: 'Ein Geschenk online', account: 'Konto', subject: 'Verwendungszweck', transfer: 'Per Banküberweisung', newLife: 'Für unser neues Leben', name: 'Name', giftSubject: 'Hochzeitsgeschenk für Fabiola und Armel', affection: 'Mit all unserer Liebe', homeLabel: 'Zur Startseite'
  }
}
const t = computed(() => translations[language.value])

function submitRsvp() {
  rsvpSent.value = true
}
</script>

<template>
  <v-app :lang="language">
    <v-main>
      <section class="hero">
        <v-container class="hero__content">
          <header class="site-header">
            <button class="monogram" type="button" :aria-label="t.homeLabel" @click="activeSection = 'accueil'">F&A</button>
            <nav aria-label="Navigation principale">
              <button type="button" :class="{ active: activeSection === 'accueil' }" @click="activeSection = 'accueil'">{{ t.home }}</button>
              <button type="button" :class="{ active: activeSection === 'histoire' }" @click="activeSection = 'histoire'">{{ t.story }}</button>
              <button type="button" :class="{ active: activeSection === 'rsvp' }" @click="activeSection = 'rsvp'">RSVP</button>
              <button type="button" :class="{ active: activeSection === 'cadeaux' }" @click="activeSection = 'cadeaux'">{{ t.gifts }}</button>
            </nav>
            <div class="language-switcher"><button :class="{ active: language === 'fr' }" @click="language = 'fr'">FR</button><span>/</span><button :class="{ active: language === 'de' }" @click="language = 'de'">DE</button></div>
          </header>

          <div id="top" class="hero__intro">
            <p class="eyebrow">{{ t.wedding }}</p>
            <h1>{{ couple }}</h1>
            <p class="hero__date">{{ t.date }} · Berlin</p>
          </div>
        </v-container>
      </section>

      <section v-if="activeSection === 'histoire'" id="histoire" class="story-section">
        <v-container class="story-wrap">
          <div>
            <p class="eyebrow">{{ t.story }}</p>
            <h2>{{ t.storyTitle }}</h2>
          </div>
          <div class="story-copy">
            <p>{{ t.storyOne }}</p>
            <p>{{ t.storyTwo }}</p>
          </div>
          <div class="story-gallery" aria-label="Photos de Fabiola et Armel">
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
                <a href="https://www.google.com/maps/search/?api=1&query=Guthaus+Mahlsdorf%2C+Hultschiner+Damm+333%2C+12623+Berlin" target="_blank" rel="noopener">Guthaus Mahlsdorf, Hultschiner Damm 333, 12623 Berlin</a>
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
                <a href="https://www.google.com/maps/search/?api=1&query=Schwalbenweg+7%2C+12529+Sch%C3%B6nefeld" target="_blank" rel="noopener">Schwalbenweg 7, 12529 Schönefeld</a>
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
                <div class="attendance-options" role="radiogroup" aria-label="Présence à la réception">
                  <label>
                    <input v-model="attendance" type="radio" name="attendance" value="yes" required />
                    {{ t.yes }}
                  </label>
                  <label>
                    <input v-model="attendance" type="radio" name="attendance" value="no" required />
                    {{ t.no }}
                  </label>
                </div>
                <v-select
                  v-if="attendance === 'yes'"
                  v-model="companion"
                  :label="t.companion"
                  :items="[t.alone, t.couple, t.guest]"
                  variant="outlined"
                  required
                />
                <v-btn color="primary" type="submit" block size="large">{{ t.send }}</v-btn>
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
    </v-main>
  </v-app>
</template>
