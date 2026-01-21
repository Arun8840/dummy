import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import dynamic from 'next/dynamic';


const Loader = () => {
    return (
        <div className="h-36 grid place-items-center font-sans">
            <Badge variant={"outline"}>
                <Spinner /> Preparing ...
            </Badge>
        </div>
    )
}
export const publisherComponents = {
    publishWeb: dynamic(() => import("./publishWeb").then((mod) => mod.PublishWeb), {
        ssr: false,
        loading: Loader,
    }),
    publishEmail: dynamic(() => import("./publishEmail").then((mod) => mod.PublishEmail), {
        ssr: false,
        loading: Loader,
    }),
    publishCustom: dynamic(() => import("./publishCustom").then((mod) => mod.PublishCustom), {
        ssr: false,
        loading: Loader,
    }),
    publishEmail2: dynamic(() => import("./publishEmail2").then((mod) => mod.PublishEmail2), {
        ssr: false,
        loading: Loader,
    }),
    publishEmbed: dynamic(() => import("./publishMobile").then((mod) => mod.PublishMobile), {
        ssr: false,
        loading: Loader,
    }),
    publishMobile: dynamic(() => import("./publishEmbed").then((mod) => mod.PublishEmbed), {
        ssr: false,
        loading: Loader,
    }),
    publishPaper: dynamic(() => import("./publishPaper").then((mod) => mod.PublishPaper), {
        ssr: false,
        loading: Loader,
    }),
}