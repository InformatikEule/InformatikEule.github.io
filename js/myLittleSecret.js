const dingeDieIchAnMirMag = [
  "wie ich an diese frage rangehe",
  "das ich stunden darüber nachdenke wie ich sie richtig beantworte",
  "um dann eine liste anzulegen,",
  "diese zu verwerfen,",
  "und anzufangen einen fliesstext zu schreiben.",
  "Dann doch wieder zu einer Liste zurückzukehren weil es einfach fixer geht",
  "ich mag es das ich mich für solche sachen lieber an meinen rechner setze und ein programm schreibe statt das auf papier zu bringen",
  "Ich mag es mit verschiedenen Programmiersprachen umgehen zu können",
  "und damit ein wenig anzugeben.",
  'ich mag die aura des "nerds" die mich da manchmal umgibt :-P',
  "das ich mich in Technik einfach wunderbar verlieren kann",
  "was in meinem kopf passiert wenn ich mich verliere",
  "dieses hochgefühl der begeisterung",
  "ich mag es wie ich mit meinen schrullen umgehe",
  "und den weg den es gebraucht hat dahin zu kommen",
  "ich mag es wie ich für mich da bin",
  "wie ich für andere da bin",
  "das ich immer als erster sehe wenn in meinem umfeld jemand hilfe braucht",
  "und dies ein automatisierter ablauf ist den ich einfach abspulen kann",
  "ohne darüber groß nachzudenken",
  "ich mag es wie ich kochen kann",
  "und das nutze um mir was gutes zu tun",
  "ich mag meine eule",
  "und das ich mir erlaube diese zu haben egal was andere sagen",
  "ich mag meine inteligenz",
  "und wie ich diese inzwischen nutzen kann",
  "ich mag das ich immer mehr an mir mag",
  "ich mag meinen humor",
  "und wie ich andere damit zum lachen bringen kann",
  "ich mag meine wohnung",
  "und wie ich sie mir eingerichtet habe",
  "meine pflanzen und ",
  "das ganze Raumfahrt zeug",
  "ich mag das ich das geschafft habe trotz der riesen probleme die ich da lange hatte",
  "ich mag es wie ich in den himmel sehe oder auf wasser",
  "und stundenlang einfach nur begeistert muster zusehen kann",
  "ich mag es das ich jeden raben der nah an mir vorbeifliegt",
  'und jede katze die ich sehe mit einem "hallo" begrüße',
  "ich mag es wie tiere auf mich reagieren",
  "und das ich offensichtlich ein talent für diese habe",
  "ich mag es wie kreativ ich bin",
  "wie ich diese kreativität nutze",
  "ich mag es gelernt zu haben mit meiner zeitblindheit besser umzugehen",
  "ich mag es wie ich mich inzwischen verstehe",
  "und welchen umgang ich deswegegen mit mir habe",
  "ich mag es mir bewusst zu sein das ich das geschafft habe trotz stärkere defizite als manch anderer",
  "ich mag es sehr zu merken wie ich aus manchen alten schwächen inzwischen stärken gemacht habe",
  "ich mag es wie schnell ich tippen kann",
  "und wie schnell ich dadurch mit dieser HA durch war :D",
  "ich mag es das es doch recht schnell ging 50 sachen zu finden!",
];

function listItems(arg) {
  let items = "";
  for (let i = 0; i < arg.length; i++) {
    items += `<li>${arg[i]}</li>`;
  }
  return items;
}

document.querySelector("main").innerHTML = `
  <ol>
  ${listItems(dingeDieIchAnMirMag)}
  </ol>
`;
