import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { TablesService } from "app/views/manage-society/manage-society.service";

@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar-side.component.html"
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;
  userData: any;

  constructor(
    private Service: TablesService,
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService
  ) { }

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }
  ngAfterViewInit() {

    this.userData = JSON.parse(sessionStorage.getItem('data'))
    if (this.userData.data.user_type != 'Admin') {

      if (this.userData.data.user_type == 'FamilyMember') {
        this.navService.publishNavigationChange("Resident");

        sessionStorage.setItem('detailUuid', this.userData.data.uuid)

        this.Service.getParentUuid(this.userData.data.uuid).subscribe(res => {
          sessionStorage.setItem('uuId', res.uuid)

        })
      } else {
        sessionStorage.setItem('uuId', this.userData.data.uuid)
        sessionStorage.setItem('detailUuid', this.userData.data.uuid)
        this.navService.publishNavigationChange(this.userData.data.user_type);

      }

    } else {
      this.navService.publishNavigationChange(this.userData.data.user_type);

    }
  }
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
      this.layout.publishLayoutChange({
        // sidebarStyle: "compact",
        sidebarCompactToggle: true
      });
    }
  }
}
