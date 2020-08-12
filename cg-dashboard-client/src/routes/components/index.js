/**
 * Components Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async routes
import {
	AsyncUIAlertsComponent,
	AsyncUIAppbarComponent,
	AsyncUIBottomNavigationComponent,
	AsyncUIAvatarsComponent,
	AsyncUIButtonsComponent,
	AsyncUIBadgesComponent,
	AsyncUICardMasonaryComponent,
	AsyncUICardsComponent,
	AsyncUIChipsComponent,
	AsyncUIDialogComponent,
	AsyncUIDividersComponent,
	AsyncUIDrawersComponent,
	AsyncUIExpansionPanelComponent,
	AsyncUIGridListComponent,
	AsyncUIListComponent,
	AsyncUIMenuComponent,
	AsyncUIPopoverComponent,
	AsyncUIProgressComponent,
	AsyncUISnackbarComponent,
	AsyncUISelectionControlsComponent,
	AsyncUIHomeComponent,
	AsyncHealth,
	AsyncSchool,
	Asyncsyncing,
	AsyncEnrollment,
	AsyncUtilisation,
	AsyncAchievement,
	AsyncLearning,
	AsyncLearningStudents,
	AsyncImprovement,
	AsyncRegularity,
	AsyncRegularityWithParameterInput,
	AsyncRegularityWithParameter,
	AsyncUsage,
	AsyncUsageStatsGradeWise,
	AsyncUsageFromRegularity,
	AsyncUsageStatsGradeWiseFromRegularity,
	AsyncSubjectCompletionWithGradeFilter,
	AsyncChapterCompletionWithSubjectFilter,
	AsyncChapterProgressWithChapterFilter,
	AsyncChapterProgressStudentList,
	AsyncCommonErrorReport,
	AsyncQuestionDetails,
	AsyncLearningOnProjectLevel,
	AsyncImprovementOnProjectLevel,
	AsyncSyncingMax
} from 'Components/AsyncComponent/AsyncComponent';



const Components = ({ match }) => (
	
	<div className="content-wrapper">
		<Helmet>
			<title>ConveGenius</title>
			<meta name="description" content="CG-Dashboard" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/alert`} />
			<Route path={`${match.url}/alerts`} component={AsyncUIAlertsComponent} />
			<Route path={`${match.url}/app-bar`} component={AsyncUIAppbarComponent} />
			<Route path={`${match.url}/avatars`} component={AsyncUIAvatarsComponent} />
			<Route path={`${match.url}/buttons`} component={AsyncUIButtonsComponent} />
			<Route path={`${match.url}/bottom-navigations`} component={AsyncUIBottomNavigationComponent} />
			<Route path={`${match.url}/badges`} component={AsyncUIBadgesComponent} />
			<Route path={`${match.url}/cards-masonry`} component={AsyncUICardMasonaryComponent} />
			<Route path={`${match.url}/cards`} component={AsyncUICardsComponent} />
			<Route path={`${match.url}/chip`} component={AsyncUIChipsComponent} />
			<Route path={`${match.url}/dialog`} component={AsyncUIDialogComponent} />
			<Route path={`${match.url}/dividers`} component={AsyncUIDividersComponent} />
			<Route path={`${match.url}/drawers`} component={AsyncUIDrawersComponent} />
			<Route path={`${match.url}/expansion-panel`} component={AsyncUIExpansionPanelComponent} />
			<Route path={`${match.url}/grid-list`} component={AsyncUIGridListComponent} />
			<Route path={`${match.url}/list`} component={AsyncUIListComponent} />
			<Route path={`${match.url}/menu`} component={AsyncUIMenuComponent} />
			<Route path={`${match.url}/popover`} component={AsyncUIPopoverComponent} />
			<Route path={`${match.url}/progress`} component={AsyncUIProgressComponent} />
			<Route path={`${match.url}/snackbar`} component={AsyncUISnackbarComponent} />
			<Route path={`${match.url}/selection-controls`} component={AsyncUISelectionControlsComponent} />
			<Route path={`${match.url}/card`} component={AsyncUIHomeComponent} />
			<Route path={`${match.url}/health`} component={AsyncHealth} />
			<Route path={`${match.url}/school`} component={AsyncSchool} />
			<Route path={`${match.url}/syncing`} component={Asyncsyncing} />
			<Route path={`${match.url}/enrollment`} component={AsyncEnrollment} />
			<Route path={`${match.url}/utilisation`} component={AsyncUtilisation} />
			<Route path={`${match.url}/achievement`} component={AsyncAchievement} />
			<Route path={`${match.url}/learning`} component={AsyncLearning} />
			<Route path={`${match.url}/learning-students`} component={AsyncLearningStudents} />
			<Route path={`${match.url}/improvement`} component={AsyncImprovement} />
			<Route path={`${match.url}/regularity`} component={AsyncRegularity} />
			<Route path={`${match.url}/regularityWithParameterInput`} component={AsyncRegularityWithParameterInput} />
			<Route path={`${match.url}/regularityWithParameter`} component={AsyncRegularityWithParameter} />
			<Route path={`${match.url}/usage`} component={AsyncUsage} />
			<Route path={`${match.url}/usageStatsGradeWise`} component={AsyncUsageStatsGradeWise} />
			<Route path={`${match.url}/usageFromRegularity`} component={AsyncUsageFromRegularity} />
			<Route path={`${match.url}/usageStatsGradeWiseFromRegularity`} component={AsyncUsageStatsGradeWiseFromRegularity} />
			<Route path={`${match.url}/subjectCompletionWithGradeFilter`} component={AsyncSubjectCompletionWithGradeFilter} />
			<Route path={`${match.url}/chapterCompletionWithSubjectFilter`} component={AsyncChapterCompletionWithSubjectFilter} />
			<Route path={`${match.url}/chapterProgressWithChapterFilter`} component={AsyncChapterProgressWithChapterFilter} />
			<Route path={`${match.url}/chapterProgressStudentList`} component={AsyncChapterProgressStudentList} />
			<Route path={`${match.url}/commonErrorReport`} component={AsyncCommonErrorReport} />
			<Route path={`${match.url}/questionDetails`} component={AsyncQuestionDetails} />
			<Route path={`${match.url}/learningOnProjectLevel`} component={AsyncLearningOnProjectLevel} />
			<Route path={`${match.url}/improvementOnProjectLevel`} component={AsyncImprovementOnProjectLevel} />
			<Route path={`${match.url}/syncingMax`} component={AsyncSyncingMax} />




		</Switch>
	</div>
);

export default Components;
