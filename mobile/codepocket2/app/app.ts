import {ViewChild} from '@angular/core';
import {App, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ProfilePage} from './pages/profile/profile';
import {RepoListPage} from './pages/repo-list/repo-list';
import {ListPage} from './pages/list/list';
import {Authentication} from './services/authentication';

declare var window: any;

@App({
    templateUrl: 'build/app.html',
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = ProfilePage;
    pages: Array<{ title: string, component?: any }>

    constructor(private platform: Platform) {

        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Personal' },
            { title: 'Profile', component: ProfilePage },
            { title: 'Repositories' },
            { title: 'Repositories', component: RepoListPage },
            { title: 'Organizations' }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
