import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { TablesService } from "app/views/manage-society/manage-society.service";
import { environment } from "environments/environment";
 

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
      this.userData = JSON.parse(sessionStorage.getItem('data'))
      if(this.userData.data.user_type == 'Society'){
        this.imageUrl = environment.LOCAL_BASE+this.userData.data.societyDetail.societyLogo;
        this.userName = this.userData.data.societyDetail.societyDisplayName;
        this.showImage = true

      }
      if(this.userData.data.user_type == 'Resident'){
        this.imageUrl = environment.LOCAL_BASE+this.userData.data.residentDetail.profileImage;
        this.userName = this.userData.data.residentDetail.firstName;
        this.showImage = true

      }
      if(this.userData.data.user_type == 'Staff'){
        this.imageUrl = environment.LOCAL_BASE+this.userData.data.staffDetals.pic;
        this.userName = this.userData.data.staffDetals.name;
        this.showImage = true

       }
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }
  imageUrl:any = "";
  userName:any = "";
  showImage:any = false
  ngAfterViewInit() {

    this.userData = JSON.parse(sessionStorage.getItem('data'))
    if (this.userData.data.user_type != 'SuperAdmin') {
      setTimeout(()=>{
        if(this.userData.data.user_type == 'Admin'){
          this.imageUrl = environment.LOCAL_BASE+this.userData.data.userDetail.profileImage;
          this.userName = this.userData.data.userDetail.name;
          this.showImage = true

        }
        if(this.userData.data.user_type == 'Society'){
          this.imageUrl = environment.LOCAL_BASE+this.userData.data.societyDetail.societyLogo;
          this.userName = this.userData.data.societyDetail.societyDisplayName;
          this.showImage = true
         }
        if(this.userData.data.user_type == 'FamilyMember'){
         }
         if(this.userData.data.user_type == 'Resident'){
          this.imageUrl = environment.LOCAL_BASE+this.userData.data.residentDetail.profileImage;
          this.userName = this.userData.data.residentDetail.firstName;
          this.showImage = true

        }
        if(this.userData.data.user_type == 'Staff'){
          this.imageUrl = environment.LOCAL_BASE+this.userData.data.staffDetals.pic;
          this.userName = this.userData.data.staffDetals.name;
          this.showImage = true

         }
      },100)
      
      if (this.userData.data.user_type == 'FamilyMember') {
        this.navService.publishNavigationChange("Resident");

 
        this.Service.getParentUuid(this.userData.data.uuid).subscribe(res => {
          sessionStorage.setItem('uuId', res.uuid)

        })
      } else {
        sessionStorage.setItem('uuId', this.userData.data.uuid)
         this.navService.publishNavigationChange(this.userData.data.user_type);

      }

    } else {
      sessionStorage.setItem('uuId', this.userData.data.uuid)

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
