'use client'
import {Document, Page, pdfjs} from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {Loader2} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import {useResizeDetector} from "react-resize-detector";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
 interface PdfRendererProps {
    url: string
 }
const PdfRenderer = ({url}: PdfRendererProps) => {
     const {toast} = useToast()
    const {width, ref} = useResizeDetector()
    return (
        <div className='w-full b-white rounded-md shadow flex flex-col items-center'>
            <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2'>
                <div className='flex items-center gap-1.5'>
                    top bar
                </div>
            </div>
            <div className='flex-1 w-full max-h-screen'>
                <div ref={ref}>
                    <Document loading={
                        <div className='flex justify-center'>
                            <Loader2 className='my-24 h-6 w-6 animate-spin' />
                        </div>
                    }
                              onLoadError={() => toast({
                                  title: 'Something went wrong',
                                  description: 'Please try again',
                                  variant: 'destructive'
                              })}
                              file={url} className='max-h-full'>
                        <Page width={width ?? 1} pageNumber={1} />
                    </Document>
                </div>
            </div>
        </div>
    )
}

export default PdfRenderer;