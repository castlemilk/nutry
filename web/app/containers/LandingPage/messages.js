/*
 * LandingPage Messages
 *
 * This contains all the text for the LandingPage component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.containers.LandingPage';

export default defineMessages({
  introduce: {
    id: `${scope}.introduce`,
    defaultMessage: 'Highly intuitive and flexible nutrient search and planning tool',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  enterprise: {
    id: `${scope}.enterprise`,
    defaultMessage: 'Enterprise',
  },
  searchP1: {
    id: `${scope}.p1.search`,
    defaultMessage: 'Search',
  },
  profilerP1: {
    id: `${scope}.p1.profiler`,
    defaultMessage: 'Profiling',
  },
  recipeP1: {
    id: `${scope}.p1.recipe`,
    defaultMessage: 'Recipes',
  },
  wikiP1: {
    id: `${scope}.p1.wiki`,
    defaultMessage: 'Wiki',
  },
  features: {
    id: `${scope}.p1.features`,
    defaultMessage: 'Features',
  },
  // p2
  nutrientEngine: {
    id: `${scope}.p2.nutrientEngine`,
    defaultMessage: 'Nutrient Engine',
  },
  architectureAPI: {
    id: `${scope}.p2.architectureAPI`,
    title: 'Developer API',
    text: 'Developer API available for consumption. Enalbling the community and other orginsations to build tools based off the Nutry Engine.',
  },
  architectureAI: {
    id: `${scope}.p2.architectureAI`,
    title: 'Artificial Intellegence Processor',
    text: 'Machine Learning and Deep Learning is ' +
    'applied to the Nutry Core System. Ingesting ' +
    'the available data and taking real-time feed back ' +
    'from users to generate actionalble insights and continually improve the suggestion and search engines.',
  },
  architectureGUI: {
    id: `${scope}.p2.architectureGUI`,
    title: 'Search Engine',
    text: 'Nutry Search and other sub-set content available for dynamic' +
    ' and rapid search. As users interact with this interface Nutry continually ' +
    ' collects informnation about a given user to further improve the suggestion engine and contextualise content for the specific user.',
  },
  architectureCoreSystem: {
    id: `${scope}.p2.architectureCoreSystem`,
    title: 'Nutry Core System',
    text: 'Heart of the end-to-end user experience. Response for mediating all ' +
    'sub-systems within the Nutry Stack.',
  },
  architecturePathOne: {
    id: `${scope}.p2.architecturePathOne`,
    title: 'Ingestion Pipeline',
    text: 'Data sources are ingested into nutry, being normsalised and enriched ' +
    ', both with trained Dieticians and using machine learning & deep learning techniques' +
    ' which aim to actively model the data and its potential correlation to a range of ' +
    ' health and nutrition contexts',
  },
  architecturePathTwo: {
    id: `${scope}.p2.architecturePathTwo`,
    title: 'AI Pipeline',
    text: 'Deep Learning (DL) and Machine Learning (ML) Techniques are utilised to' +
    ' bring about the Nutry vision of contextualising and simplifying the relavence of nutritional data',
  },
  architecturePathThree: {
    id: `${scope}.p2.architecturePathThree`,
    title: 'Consumption Mechanism',
    text: 'Nutry is made available by a range of mechanisms which are all contexualised to specific areas.' +
    ' The major areas being: Enterprise, Consumer and Developers.',
  },
  architectureDataSources: {
    id: `${scope}.p2.architectureDataSources`,
    title: 'Data Sources',
    text: 'Nutry aims to ingest relavent data from as many sources as possible. This includes ' +
    'publicly available data such as NUTTAB, USDA. These are nutrient data sets made possible by different government organisations.' +
    ' In This case Australia and USA respectively.',
  },
  architectureEnterprise: {
    id: `${scope}.p2.architectureEnterprise`,
    title: 'Nutry Enterprise',
    text: 'A consumption mechanism for health professionals. This could be in the form of organisation wide subscriptions or small businesses or health consultants.' +
    ' These users rely on highly accurate and detailed information. As well as integrations with other servives such as medicare et al.',
  },
  architectureDefault: {
    id: `${scope}.p2.architectureDefault`,
    title: 'Nutry Overview',
    text: 'To the right you see an overview of the Nutry architecture topology at a high level. This is the end-to-end system which brings you the highly' +
    ' accurate and contextualised content.',
  },
  developers: {
    id: `${scope}.p3.developers`,
    defaultMessage: 'Developers',
    description: 'Nutry is built on a core tenant or philosophy of improving access to information' +
    ' and making it easy for people to digest it (no pun intended). By proving a highly accessible and verbose API we make it possible for other' +
    ' organisations and users to consume the data to built tools that we know you\'ll love becuase of how rich the data is.',
  },
});
