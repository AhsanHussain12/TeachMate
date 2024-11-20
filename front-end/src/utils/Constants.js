import SearchIcon from '@mui/icons-material/Search';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import GroupIcon from '@mui/icons-material/Group';
import UploadIcon from '@mui/icons-material/Upload';
import WorkIcon from '@mui/icons-material/Work';

const teacherSidebarConstants = {
    findGig :{    
        icon : SearchIcon,
        label: "Find GiGs",
        route: '/dashboard/teacher/find-gigs'
    },  
    appliedGig :{    
        icon : AssignmentTurnedIn,
        label:"Applied GiGs",
        route: '/dashboard/teacher/applied-gigs'
    },
    settings :{    
      route: '/dashboard/teacher/settings'
    },
    students:
    {    
      icon : GroupIcon,
      label:"Students",
      route: '/dashboard/teacher/students'
    }
};
const studentSidebarConstants = {
    postGig :{    
        icon : UploadIcon,
        label: "Post GiGs",
        route: '/dashboard/student/post-gig'
    },  
    myGig :{    
        icon : WorkIcon,
        label:"MY GiGs",
        route: '/dashboard/student/my-gigs'
    },
    settings :{    
      route: '/dashboard/student/settings'
    },

    teachers:
    {    
      icon : GroupIcon,
      label:"Teachers",
      route: '/dashboard/student/teachers'
    }
};


export {teacherSidebarConstants ,studentSidebarConstants};