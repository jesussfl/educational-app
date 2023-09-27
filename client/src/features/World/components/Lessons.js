import React from "react";
import { View, StyleSheet } from "react-native";
import { LessonButton } from "@components";
import { Svg, Line } from "react-native-svg";
import { Colors } from "../../../utils/Theme";
const positions = [0, 44, 70];

const Lessons = ({ lessons, lessonsCompleted, handlePresentModalPress, setLessonId }) => {
	let lastUnlockedIndex; // Inicializamos la variable para rastrear la última lección desbloqueada

	return (
		<View>
			{lessons.map((lesson, index) => {
				// Calcular la posición izquierda según el índice
				const positionIndex = index % positions.length;
				let leftPosition = positions[positionIndex];

				// Si el índice excede la longitud de positions, invertir el valor
				if (Math.floor(index / positions.length) % 2 === 1) {
					leftPosition = -leftPosition;
				}

				// Comprobar si la lección actual está completada
				const isCompleted = lesson.id === lessonsCompleted[index]?.attributes?.lesson?.data?.id;

				// Comprobar si es la última lección desbloqueada
				const isUnlocked = index === lastUnlockedIndex + 1;

				// Comprobar si la lección está bloqueada
				const isLocked = !isCompleted && !isUnlocked;

				if (isCompleted) {
					lastUnlockedIndex = index; // Actualizamos la última lección desbloqueada
				}

				return (
					<React.Fragment key={lesson.id}>
						<View
							onLayout={(e) => {
								leftPosition = e.nativeEvent.layout.x;
							}}>
							<LessonButton
								key={lesson.id}
								isCompleted={isCompleted}
								isUnlocked={isUnlocked}
								isLocked={isLocked}
								left={leftPosition}
								onPress={() => {
									if (true) {
										// Solo ejecutar onPress si no está bloqueado
										handlePresentModalPress(lesson.id);
										setLessonId(lesson.id);
									}
								}}
							/>
						</View>
						<Line x1={38} y1={0} x2={100} y2={200} stroke={isLocked ? Colors.gray_200 : Colors.gray_200} strokeWidth={44} />
						<Line x1={38 * 2} y1={150} x2={140} y2={380} stroke={isLocked ? Colors.gray_200 : Colors.gray_200} strokeWidth={44} />
					</React.Fragment>
				);
			})}
		</View>
	);
};

export default Lessons;

const styles = StyleSheet.create({
	svgContainer: {
		position: "relative",
	},
});
