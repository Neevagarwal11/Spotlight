import { HomeIcon, Network, SettingsIcon, Sparkle, Sparkles, Webcam } from "lucide-react";

export const sidebarData = [
    {
        id:1,
        title:"Home",
        icon: HomeIcon,
        link : '/home',
    },
    {
        id:2,
        title:'Webinars',
        icon: Webcam,
        link: '/webinars'
    },
    {
        id:3 ,
         title :'Leads',
         icon : Network,
         link : '/lead'
    },
    {
        id:4,
        title: "Ai Agents",
        icon: Sparkles,
        link :'/ai-agents'
    },
    {
        id:5,
        title:'Settings',
        icon : SettingsIcon,
        link : "/settings",
    }
]

export const OnBoardingSteps = [
    {id:1, title: 'Create a webinar', complete: false , link:''},
    {id:2, title: 'Get leads', complete: false , link:''},
    {id:3, title: 'Conversion status', complete: false , link:''},
]