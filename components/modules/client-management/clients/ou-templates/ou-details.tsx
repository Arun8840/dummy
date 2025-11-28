"use client"

import { trpc } from "@/trpc/client"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { getDate } from "@/utils/functions/helpers"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BadgeCheckIcon, Pen } from "lucide-react"
interface ClientDetailsProps {
  ouId: string
}

export const OuDetails = ({ ouId: clientTemplateId }: ClientDetailsProps) => {
  const client = trpc.client.template.useQuery({ clientId: clientTemplateId })

  if (client.isLoading) {
    return <Skeleton className="w-full h-[100px]" />
  }

  const {
    name,
    active,
    createdUserId,
    email,
    status,
    modifiedDate,
    modifiedUserId,
    clientId,
  } = client?.data?.data || {}

  const modifiedDateString = getDate(modifiedDate)
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full border rounded-lg"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="rounded-none px-2">
            Client Information
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ClientId</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Last Updated By</TableHead>
                  <TableHead>Last Updated Date</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{clientId}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    <Badge
                      data-published={status === "Published"}
                      variant="secondary"
                      className=" data-[published=true]:bg-blue-500 data-[published=true]:text-white dark:data-[published=true]:bg-blue-600 dark:text-white"
                    >
                      <BadgeCheckIcon />
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell>{createdUserId}</TableCell>
                  <TableCell>{modifiedUserId}</TableCell>
                  <TableCell>{modifiedDateString}</TableCell>
                  <TableCell>
                    <Switch defaultChecked={active} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant={"ghost"} size={"icon-sm"}>
                      <Pen fill="currentColor" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
