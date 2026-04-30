'use server'

import { prismaClient } from "@/lib/prismaClient";
import { AttendanceData } from "@/lib/type";
import { Attendance, AttendedTypeEnum } from "@prisma/client";

const getWebinarAttendance = async (webinarId:string, options: {includeUsers? : boolean; userLimit?:number ; } = {includeUsers: true , userLimit:100}) => {


    try{
        const webinar = await prismaClient.webinar.findUnique({
            where: { id : webinarId},
            select:{
                id:true,
                ctaType: true,
                tags: true,
                _count: {
                    select:{
                        attendances:true
                    },
                },
            },
        })
        if(!webinar){
            return{
                success : false, 
                status: 404,
                error: "Webinar not found"
            }
        }

        const attendanceCounts = await prismaClient.attendance.groupBy({
            by:['attendedType'],
            where:{
                webinarId
            },
            _count:{
                attendedType:true
            },
        })

        const result = Record<AttendedTypeEnum , AttendanceData> = {} as Record<AttendedTypeEnum , AttendanceData>




    }catch(error){
    }

}