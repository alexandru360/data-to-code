import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('api/meetings')
export class MeetingsController {
    // constructor(private meetingsService: MeetingService){}
    //
    // @Get()
    // index(): ActualMeeting [] {
    //   return this.meetingsService.ActualMeetings();
    // }
    // @Get(':id')
    // getMeeting(@Param('id') id: any): Meeting {
    //   return this.meetingsService.findMeeting(id);
    // }
    //
    // @Post()
    // async create(@Body() cm: CreateMeeting): Promise<Meeting> {
    //     // console.log(`userName : ${JSON.stringify(cm.userName)}  meetingName: ${JSON.stringify(cm.meetingName)}`);
    //     return this.meetingsService.create(cm.userName, cm.meetingName);
    // }
    // @Put('addParticipant')
    // async addParticipant(@Body() addParticipant: AddParticipant): Promise<Meeting> {
    //     // console.log(`userName : ${JSON.stringify(cm.userName)}  meetingName: ${JSON.stringify(cm.meetingName)}`);
    //     return this.meetingsService.AddParticipant(addParticipant.meetingId, addParticipant.nameParticipant);
    // }
    // @Put(':id/checkCard')
    // async checkCard(@Param('id') id: any, @Body() CP: CheckCardParticipant): Promise<Meeting> {
    //     // console.log(`userName : ${JSON.stringify(cm.userName)}  meetingName: ${JSON.stringify(cm.meetingName)}`);
    //     return this.meetingsService.checkCard(id, CP.cardId, CP.userName);
    // }
    // // @Post(':id/checkCard')
    // // async postCard(@Param('id') id: any, @Body() PC: postCard): Promise<Meeting> {
    // //   // console.log(`userName : ${JSON.stringify(cm.userName)}  meetingName: ${JSON.stringify(cm.meetingName)}`);
    // //   return this.meetingsService.postCard();
    // // }

}
