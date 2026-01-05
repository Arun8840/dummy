"use client"
import { Button } from '@/components/ui/button'
import { Warning } from '@/utils/ui/warning'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const navigate = useRouter()
    return (
        <section className='size-full  min-h-screen grid place-items-center'>
            <Warning
                title='Page Not Found (Work In Progress)'
                description='This page is still a work in progress. The content you are looking for does not exist yet.'
                variant='destructive'
                actions={
                    <Button onClick={() => navigate?.back()} size={"sm"} className='w-full'>
                        Go to Back <ArrowRight />
                    </Button>
                }
            />
        </section>
    )
}