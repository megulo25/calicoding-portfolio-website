// =============================================================================
// Descriptive alt text for gallery images, keyed by `/public` path.
// Images without an entry fall back to "<project> screen N".
// =============================================================================

export const IMAGE_ALT: Readonly<Record<string, string>> = {
  // StreamNest — Apple TV
  "/images/streamnest/tv-home.jpg":
    "StreamNest on Apple TV: home screen with the featured film Spring, a short synopsis and Play and More Info buttons.",
  "/images/streamnest/tv-browse-row.jpg":
    "Apple TV My List row with one tile expanded into a wide scene, and the selected show's genre, year, season count and synopsis below.",
  "/images/streamnest/tv-title-detail.jpg":
    "Apple TV detail page for Spring over full-screen artwork, with Resume (with progress), Play from beginning and Add to My List.",
  "/images/streamnest/tv-player.jpg":
    "Full-screen video playback on Apple TV with the title in the corner and a progress bar with elapsed and remaining time.",
  // StreamNest — iPhone
  "/images/streamnest/iphone-home.jpg":
    "iPhone home screen with a featured film, a Continue Watching row with progress bars, and a My List row of posters.",
  "/images/streamnest/iphone-title-detail.jpg":
    "iPhone detail page for the series Northern Signal with Play First Episode, My List and Download to Device buttons, a synopsis and a list of episodes.",
  "/images/streamnest/iphone-player.jpg":
    "iPhone video player in portrait showing an animated mountain scene, with play/pause, skip buttons and a timeline.",
  "/images/streamnest/iphone-downloads.jpg":
    "iPhone downloads list: two episodes paused part-way with Resume buttons and four episodes saved on the device with Play buttons.",
  "/images/streamnest/iphone-search.jpg":
    "iPhone search for \"or\" with three results: Lowtide Harbor, Northern Signal and Orbit Nine, each marked In Library.",
  "/images/streamnest/iphone-profiles.jpg":
    "\"Who's watching?\" screen with three profiles: Demo, Guest and Kids.",
  // StreamNest — web admin
  "/images/streamnest/admin-library.jpg":
    "Web admin library view: a grid of titles with poster, year, number of files and size.",
  "/images/streamnest/admin-activity.jpg":
    "Web admin watch activity table with profile, title and episode, a progress bar with time watched, when, and an in progress or watched badge.",
  "/images/streamnest/admin-profiles.jpg":
    "Web admin profiles table with Demo, Guest and Kids, watch counts, last active and created dates, and rename, clear and delete actions.",
  // Nexus — Apple TV
  "/images/nexus/tv-home.jpg":
    "Nexus on Apple TV: a \"Good afternoon, Demo\" home screen with mixes and playlists in a grid and a Jump back in row.",
  "/images/nexus/tv-now-playing.jpg":
    "Nexus Now Playing on Apple TV: large album art, track and artist, a progress bar and playback controls on a purple backdrop.",
  "/images/nexus/tv-library.jpg":
    "Nexus library on Apple TV showing the Artists tab as a grid of round artist images.",
  "/images/nexus/tv-pairing.jpg":
    "Nexus Apple TV sign-in screen showing a six-character pairing code to enter in the iPhone app.",
  // Nexus — Apple Watch
  "/images/nexus/watch-library.png":
    "Nexus Apple Watch library with Liked Songs under Favorites and a Recently Played list.",
  // Nexus — offline
  "/images/nexus/iphone-offline-downloading.jpg":
    "Nexus playlist on iPhone with tracks downloading for offline listening, downloaded tracks marked with a green dot.",
  "/images/nexus/iphone-offline-playlists.jpg":
    "Nexus on iPhone with no connection, showing an offline banner and only the downloaded playlist.",
  "/images/nexus/iphone-offline-now-playing.jpg":
    "Nexus Now Playing on iPhone while offline, playing a downloaded track.",
  // Cat Countermeasure — detection (sample footage)
  "/images/cat-countermeasure/detect-poster.jpg":
    "A calico cat eating from a dark dish, outlined by an amber box labelled \"cat 0.71 TARGET\", with a grey status pill reading COOLDOWN.",
  "/images/cat-countermeasure/detect-person-hold.jpg":
    "Four cats eat along a white wall; a person's legs on the right are outlined in green and labelled \"person 0.74 SUPPRESS\", and the status pill reads \"HOLD \u00b7 person\".",
  "/images/cat-countermeasure/detect-cat-held.jpg":
    "A calico cat outlined in amber and labelled \"cat 0.63 TARGET\"; the status pill reads \"HOLD \u00b7 person 2.6s\" while the person countdown runs.",
  "/images/cat-countermeasure/detect-fire.jpg":
    "A calico cat outlined in amber and labelled \"cat 0.61 TARGET\"; the region of interest flashes orange-red and the status pill reads FIRE.",
  // Cat Countermeasure — CAD
  "/images/cat-countermeasure/cad-render.jpg":
    "Render of the stand on a black backdrop: a black 3D-printed base and tower holding a silver can, a servo arm over the nozzle, and a small camera board on a tilting mast at the front right.",
  "/images/cat-countermeasure/cad-render-three-quarter.jpg":
    "The same stand from the front left and slightly above: the tower and its slotted servo carriage behind the silver can, and the camera mast beside it.",
  "/images/dmaasd/home.jpg":
    "A list of obituary cards with illustrated portraits, names, years and ages, under a welcome heading.",
  "/images/dmaasd/obituary.jpg":
    "An obituary for Theodora Linwell, 1934–2026, age 92, with her memorial service date, place and a Get Directions button.",
  "/images/dmaasd/services.jpg":
    "Memorial and funeral service sections, each with date, time, location and a Get Directions button, above the memorial flyer.",
  "/images/dmaasd/flyer.jpg":
    "A cream memorial flyer reading \"In Loving Memory, Theodora Linwell, 1934 – 2026\" with service times, shown full screen with a Close button.",
  "/images/dmaasd/notifications.jpg":
    "A list of community announcements: Annual Remembrance Gathering (marked new), Meal Train Volunteers and Monthly Community Meeting.",
  "/images/dmaasd/notification-detail.jpg":
    "The Annual Remembrance Gathering announcement with an illustration of a lit candle and flowers, and a voice message player.",
  "/images/dmaasd/admin-manage.jpg":
    "Admin list of obituaries with review, edit, notify and delete buttons and a publish switch; one obituary is pending review.",
  "/images/dmaasd/admin-review.jpg":
    "A pending obituary's details and flyer with Approve and Deny buttons.",
  "/images/dmaasd/wizard-1.jpg":
    "Obituary wizard step 1 of 4: member code, first and last name, birth year and death year.",
  "/images/dmaasd/wizard-2.jpg":
    "Obituary wizard step 2 of 4: an illustrated portrait and a memorial flyer have been added.",
  "/images/dmaasd/wizard-3.jpg":
    "Obituary wizard step 3 of 4: the memorial service is on, with a date and location; the funeral service is off.",
  "/images/dmaasd/wizard-4.jpg":
    "Obituary wizard step 4 of 4: a review of personal information, photos and services, with a Submit button.",
  "/images/addis_tab/dashboard.jpg":
    "Merchant dashboard with a seven-day debt bar chart and cards: total debt $1,798.75, open tabs 12, customers 14.",
  "/images/addis_tab/customers.jpg":
    "A searchable list of customers with phone numbers and balances.",
  "/images/addis_tab/record-credit.jpg":
    "A form filled in with a $24.50 credit, the note \"Groceries\" and a receipt photo thumbnail, above a Submit button.",
  "/images/addis_tab/customer-tab.jpg":
    "A customer's tab showing a $110.75 balance and recent transactions, with the new $24.50 credit at the top.",
  "/images/addis_tab/receipt.jpg":
    "A full-screen photo of a paper receipt from Demo Market listing grocery items and a total of $24.50.",
  "/images/addis_tab/customer-notification.jpg":
    "The customer's phone shows a \"New Transaction at Demo Market\" notification for $24.50 over her dashboard showing total debt $110.75.",
  "/images/addis_restaurant/desktop-hero.jpg":
    "Desktop restaurant homepage hero with a dimmed food platter video background, the headline \"Delicious Food & Wonderful Eating Experience\" and two orange buttons.",
  "/images/addis_restaurant/desktop-menu.jpg":
    "Desktop menu in three columns, Breakfast, Lunch and Dinner, each listing dishes with descriptions and orange prices.",
  "/images/addis_restaurant/mobile-hero.jpg":
    "Mobile restaurant homepage with a dark food video background, the headline and \"View Our Menu\" and \"Order Online\" buttons.",
  "/images/addis_restaurant/mobile-menu.jpg":
    "Mobile breakfast menu on a soft cream background listing Ethiopian dishes with short descriptions and orange prices.",
  "/images/nexus/mac-home.jpg":
    "Nexus for Mac: a sidebar and a Home page reading \"Good morning\", with rows of album cards for Jump back in, Made for you and Recently added, and a player bar at the bottom.",
  "/images/nexus/mac-library.jpg":
    "The Nexus Mac library: songs listed with cover, title, artist, album, a like heart and duration, with the playing track highlighted in green.",
  "/images/nexus/mac-playlist.jpg":
    "The Nexus Mac playlist page for \"Late Night Drive\" with a green play button, shuffle and favorite controls and the track list.",
  "/images/nexus/mac-now-playing.jpg":
    "The Nexus Mac Now Playing sheet: a large sunset cover, \"Night Swim\" by Velvet Meridian, a seek bar and transport controls.",
  "/images/nexus/watch-now-playing.png":
    "Apple Watch Now Playing: a small sunset cover, \"Afterglow Drive\" by Velvet Meridian, a progress bar, previous, pause and next buttons.",
  "/images/addis_restaurant/mobile-food.jpg":
    "Mobile page showing a large photo of a server spooning food onto an injera platter, with the top of a second photo of colorful woven serving baskets below.",
}
