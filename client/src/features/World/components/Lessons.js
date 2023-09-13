import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LessonButton, Button } from "@components";

const Lessons = ({ lessons, lessonsCompleted, handlePresentModalPress, setLessonId, last_index }) => {
	return (
		<View>
			{/* Render Lessons By Section */}
			{lessons.map((lesson, index) => {
				if (lesson.id == lessonsCompleted[index]?.attributes?.lesson?.data?.id) {
					last_index = index;
					return (
						<LessonButton
							key={lesson.id}
							isCompleted={true}
							onPress={() => {
								handlePresentModalPress(lesson.id);
								setLessonId(lesson.id);
							}}
						/>
					);
				} else if (index == last_index + 1) {
					return (
						<LessonButton
							key={lesson.id}
							isUnlocked={true}
							onPress={() => {
								handlePresentModalPress(lesson.id);
								setLessonId(lesson.id);
							}}
						/>
					);
				} else {
					return (
						<LessonButton
							key={lesson.id}
							isLocked={true}
							onPress={() => {
								// handlePresentModalPress(lesson.id);
								// setLessonId(lesson.id);
							}}
						/>
					);
				}
			})}
		</View>
	);
};

export default Lessons;

const styles = StyleSheet.create({});
