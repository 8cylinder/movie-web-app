initializeANSI()
{
	esc=""

	blackf="${esc}[30m";
	redf="${esc}[31m";
	greenf="${esc}[32m"
	yellowf="${esc}[33m";
	bluef="${esc}[34m";
	purplef="${esc}[35m"
	cyanf="${esc}[36m";
	whitef="${esc}[37m";

	blackb="${esc}[40m";
	redb="${esc}[41m";
	greenb="${esc}[42m"
	yellowb="${esc}[43m";
	blueb="${esc}[44m";
	purpleb="${esc}[45m"
	cyanb="${esc}[46m";
	whiteb="${esc}[47m"

	boldon="${esc}[1m";
	boldoff="${esc}[22m"
	italicson="${esc}[3m";
	italicsoff="${esc}[23m"
	ulon="${esc}[4m";
	uloff="${esc}[24m"
	invon="${esc}[7m";
	invoff="${esc}[27m"

	reset="${esc}[0m"
}
initializeANSI

function error
{
	local this_prog=$(basename $0)
	echo "${redb}${boldon}Error${reset} ${bluef}$this_prog:${reset} $*";
	exit 1;
}

function colorize
{
	if [ ! "$1" ]; then
		echo "colorize function requires 2 arguments:"
		echo "1st arg: text string"
		echo "2nd arg: list of color variables"
		echo "optional 3rd arg: <nonl> to not output a newline at the end"
		echo "eg: colorize \"this is some text\" \$blueb\$ulon"
		exit 1;
	fi
	output="${2}$1${reset}"
	if [[ $3 = nonl ]]; then
		echo -n $output;
	else
		echo $output;
	fi
}

# test functions
if [ $(basename $0) = 'color_and_error.bash' ]; then

	color_list="blackf redf greenf yellowf bluef purplef cyanf whitef blackb redb greenb yellowb blueb purpleb cyanb whiteb boldon boldoff italicson italicsoff ulon uloff invon invoff"

	echo
	colorize 'Test output with no newlines' $boldon$ulon$redb

	for color in $color_list; do
		colorize "Now testing: $color" $(eval echo \$$color) nonl
	done

	echo
	echo
	colorize 'Test output with newlines' $boldon$ulon$redb

	for color in $color_list; do
		colorize "Now testing: $color" $(eval echo \$$color)
	done

	echo

	k=15
	for i in $(seq 17 52); do

		for j in $(seq 6); do

			k=$(($k + 1))

			if   [[ ${#k} = 1 ]]; then pad='   ';
			elif [[ ${#k} = 2 ]]; then pad='  ';
			elif [[ ${#k} = 3 ]]; then pad=' ';
			fi

			echo -n "[48;5;${k}m ${k}${pad}[0m"
		done
		echo
	done

	# echo "[48;5;58m some string [0m"
	echo "[38;1;33m some string [0m"
fi
