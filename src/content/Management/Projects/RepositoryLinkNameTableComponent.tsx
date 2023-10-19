import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import { Session } from 'next-auth';


export default function RepositoryLinkTableComponent({
    params,
    session,
}): JSX.Element {
    const ses: Session = session
    const vis: string = params.row.visibility;
    return <>
        {/* {ses 
        && ses.user, 
        && ses.user.} */}
        {vis === 'public' && <Link
            variant="h4" target='_new'
            href={params.value} > URL
        </Link>}
        {vis === 'private' && <VisibilityOffIcon
        // target='_new' href={params.value} 
        >
        </VisibilityOffIcon>}

    </>

}