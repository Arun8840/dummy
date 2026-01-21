import { Button } from '@/components/ui/button'
import { Form, FormMessage, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Switch } from '@/components/ui/switch'
import { useSurveyPublisherContext } from '@/context/Survey-publisher-providers'
import { PublisherComponentType } from '@/types/survey-management/survey-types'
import CheckboxGroup from '@/utils/ui/checkBox-group'
import { CustomCard } from '@/utils/ui/custom-card'
import { Minus, Pen, Save, Undo2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

interface WrapperProps {
    publihser: PublisherComponentType
    children: React.ReactNode
}
export const Wrapper: React.FC<WrapperProps> = ({ children, publihser }) => {
    const { isEdit, setEdit, workflowTemplates, remove, isPending } = useSurveyPublisherContext()
    const form = useForm<PublisherComponentType>({
        defaultValues: {
            ...publihser
        }
    })

    const { overrideTheme, overrideWorkflow } = form?.watch()

    const isEditable = isEdit === publihser?.id
    const toggleEdit = (compId: string | null) => {
        setEdit?.(compId)
    }

    const removePublisher = async () => {
        const request = {
            componentId: publihser?.id || "",
            componentType: publihser?.componentType || "",
            containerId: publihser?.containerId || "",
            subComponentType: publihser?.subComponentType || "",
        }
        remove?.(request)
    }
    const PublihserEditorActions = () => {
        return <div className='flex items-center gap-2 pl-3'>
            <Label htmlFor={publihser?.id}>
                <Switch id={publihser?.id} />
                <span>Deploy</span>
            </Label>
            {
                !isEditable ?
                    <Button disabled={isPending} title='Edit' type='button' size={"icon-sm"} variant={"outline"} onClick={() => toggleEdit(publihser?.id)}>
                        <Pen className='text-primary' />
                    </Button>
                    :
                    <>
                        <Button disabled={isPending} title='Reset Or Cancel' type='button' size={"icon-sm"} variant={"outline"} onClick={() => toggleEdit(null)}>
                            <Undo2 className='text-primary' />
                        </Button>
                        <Button disabled={isPending} className='text-primary' title='Reset Or Cancel' type='button' size={"sm"} variant={"outline"} >
                            <Save />
                            Save Publisher
                        </Button>
                    </>
            }
            <Button disabled={isPending} type='button' size={"icon-sm"} variant={"outline"} title={`Remove-${publihser?.name}`} onClick={removePublisher}>
                {
                    isPending ? <Spinner /> : <Minus className='text-destructive' />
                }
            </Button>
        </div>
    }


    const CreateThemeSelector = () => {
        return (
            <Select disabled={!isEditable}>
                <SelectTrigger size='sm'>
                    {"Select Theme"}
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="helo">
                        Default Theme
                    </SelectItem>
                    <SelectItem value="light">
                        Light Theme
                    </SelectItem>
                    <SelectItem value="dark">
                        Dark Theme
                    </SelectItem>
                </SelectContent>
            </Select>
        )
    }
    const CreateLanguageSelector = () => {
        return (
            <Select disabled={!isEditable}>
                <SelectTrigger size='sm'>
                    {"Select Language"}
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="helo">
                        Default Theme
                    </SelectItem>
                    <SelectItem value="light">
                        Light Theme
                    </SelectItem>
                    <SelectItem value="dark">
                        Dark Theme
                    </SelectItem>
                </SelectContent>
            </Select>
        )
    }
    return (
        <CustomCard title={publihser?.name} CardAction={<PublihserEditorActions />} className='shadow'>
            <Form {...form}>
                <form className='flex flex-col gap-2'>
                    {isEditable && <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Publisher Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />}
                    <div className='flex items-center gap-2 flex-wrap'>
                        <CheckboxGroup disabled={!isEditable} label="Override Workflow" id={`override-workflow-${publihser?.id}`}
                            onCheckedChange={(e) => form.setValue("overrideWorkflow", e)} />
                        <CheckboxGroup disabled={!isEditable} label="Override Theme" id={`override-theme-${publihser?.id}`}
                            onCheckedChange={(e) => form.setValue("overrideTheme", e)} />
                        {overrideTheme &&
                            <CreateThemeSelector />
                        }
                        <CreateLanguageSelector />
                    </div>
                    {overrideWorkflow && (
                        <RadioGroup name='overrideWorkflow' className="flex items-center gap-2">
                            {Array.isArray(workflowTemplates) && workflowTemplates.map((workflow) => (
                                <Label
                                    key={`${publihser?.id}-${workflow?.id}`}
                                    htmlFor={`${publihser?.id}-${workflow?.id}`}
                                    className="has-checked:bg-accent rounded-lg p-2"
                                >
                                    <RadioGroupItem value={workflow?.id} id={`${publihser?.id}-${workflow?.id}`} />
                                    {workflow?.name}
                                </Label>
                            ))}
                        </RadioGroup>
                    )}

                    {/* //* CHILDREN */}
                    <div>
                        {children}
                    </div>
                </form>
            </Form>
        </CustomCard>
    )
}
