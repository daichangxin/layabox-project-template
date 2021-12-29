/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

/* eslint-disable */
declare namespace c
{
	export interface loginUI {
		btn_login: fgui.GButton;
		txt_name: fgui.GTextInput;
	}
	

	export interface CircleIcon {
		icon: fgui.GLoader;
	}
	

	export interface dele_noticeContent {
		txt_des: fgui.GTextField;
		icon: fgui.GComponent & { $skin: CircleIcon };
	}
	

	export interface UI_notice {
		message: fgui.GComponent & { $skin: dele_noticeContent };
		t_show: fgui.Transition;
		t_hide: fgui.Transition;
	}
	

	export interface ToastItem {
		txt_des: fgui.GTextField;
	}
	

	export interface alertUI {
		state: fgui.Controller;
		txt_content: fgui.GRichTextField;
		txt_title: fgui.GTextField;
		btn_cancel: fgui.GButton;
		btn_ok: fgui.GButton;
	}
	

}