import type { EditableTemplate } from "../editor/types";
import { auraDining } from "./aura-dining";
import { eventsEverafter } from "./events-everafter";
import { immersiveCasaalba } from "./immersive-casaalba";
import { immersiveStillwild } from "./immersive-stillwild";
import { jungleTreehouseHotel } from "./jungle-treehouse-hotel";
import { portfolioBento } from "./portfolio-bento";
import { premiumAsterHealth } from "./premium-aster-health";
import { premiumAtelierNord } from "./premium-atelier-nord";
import { premiumDuneAtlas } from "./premium-dune-atlas";
import { premiumFernFinance } from "./premium-fern-finance";
import { premiumForgeAthletics } from "./premium-forge-athletics";
import { premiumKairnAlpine } from "./premium-kairn-alpine";
import { premiumLumenSkin } from "./premium-lumen-skin";
import { premiumOaklineEstate } from "./premium-oakline-estate";
import { premiumStudioVandal } from "./premium-studio-vandal";
import { premiumTerraEmber } from "./premium-terra-ember";
import { realEstateLuxuryApartments } from "./realestate-luxury-apartments";
import { saasAuroraAi } from "./saas-aurora-ai";
import { saasNexusDev } from "./saas-nexus-dev";
import { saasPrismAnalytics } from "./saas-prism-analytics";

/** Templates that open in the visual editor, keyed by template id */
export const editableTemplates: Record<string, EditableTemplate> = {
  [auraDining.id]: auraDining,
  [eventsEverafter.id]: eventsEverafter,
  [immersiveCasaalba.id]: immersiveCasaalba,
  [immersiveStillwild.id]: immersiveStillwild,
  [jungleTreehouseHotel.id]: jungleTreehouseHotel,
  [portfolioBento.id]: portfolioBento,
  [premiumAsterHealth.id]: premiumAsterHealth,
  [premiumAtelierNord.id]: premiumAtelierNord,
  [premiumDuneAtlas.id]: premiumDuneAtlas,
  [premiumFernFinance.id]: premiumFernFinance,
  [premiumForgeAthletics.id]: premiumForgeAthletics,
  [premiumKairnAlpine.id]: premiumKairnAlpine,
  [premiumLumenSkin.id]: premiumLumenSkin,
  [premiumOaklineEstate.id]: premiumOaklineEstate,
  [premiumStudioVandal.id]: premiumStudioVandal,
  [premiumTerraEmber.id]: premiumTerraEmber,
  [realEstateLuxuryApartments.id]: realEstateLuxuryApartments,
  [saasAuroraAi.id]: saasAuroraAi,
  [saasNexusDev.id]: saasNexusDev,
  [saasPrismAnalytics.id]: saasPrismAnalytics,
};
